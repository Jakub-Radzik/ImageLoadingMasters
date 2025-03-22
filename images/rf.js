// index.js
const fs = require("fs");
const path = require("path");
const ExcelJS = require("exceljs");
const sharp = require("sharp");
const ssim = require("image-ssim");

// Directories to read
const pre = "REFERENCE_FILES";
const directories = [
  "AVIF_LOSSLESS",
  "AVIF_LOSSY",
  "JPG",
  "PNG",
  // 'REFERENCE_FILES',  // (Uncomment if you want to include reference files too)
  "WEBP_LOSSLESS",
  "WEBP_LOSSY",
];

// Map for naming
const imageMap = {
  1: "Twarz",
  2: "Krajobraz",
  3: "Miasto",
};

// Helper: extract the reference filename from the processed file
function getReferenceFile(fileName) {
  const parts = fileName.split("_");
  // e.g. "3_w800_lvl5_lossless.avif" -> reference "3_w800.png"
  return `${parts[0]}_${parts[1]}.png`;
}

// Decode an image to raw pixel data
async function loadImageAsRaw(filePath) {
  const { data, info } = await sharp(filePath)
    .ensureAlpha() // Or use .toColourspace('rgb') for 3 channels
    .raw()
    .toBuffer({ resolveWithObject: true });

  return {
    data,
    width: info.width,
    height: info.height,
    channels: info.channels,
  };
}

// Calculate SSIM between a file and its reference
async function calcSSIM(fileName, dir) {
  const referenceFileName = getReferenceFile(fileName);
  const filePath = path.join(__dirname, dir, fileName);
  const refPath = path.join(__dirname, `${pre}/${referenceFileName}`);

  const img1 = await loadImageAsRaw(refPath);
  const img2 = await loadImageAsRaw(filePath);

  return ssim.compare(img1, img2); // returns { ssim: number, mcs: number }
}

// Main async function to gather data
async function main() {
  const fileData = [];

  // Loop through each directory
  for (const dir of directories) {
    if (!fs.existsSync(dir)) {
      console.warn(`Directory not found: ${dir}`);
      continue;
    }

    // Read files from directory
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      if (!stats.isFile()) {
        // Skip subdirectories
        continue;
      }

      // Parse file name
      const partsOfFileName = file.split("_");
      const referenceFileName = getReferenceFile(file);

      // Calculate SSIM (await needed here)
      let ssimResult = { ssim: NaN, mcs: NaN };
      try {
        ssimResult = await calcSSIM(file, dir);
      } catch (err) {
        console.error(`Error calculating SSIM for ${file}:`, err);
      }

      // Build row object
      fileData.push({
        name: file,
        size: stats.size,
        img: imageMap[partsOfFileName[0]], // e.g. '3' -> 'Miasto'
        width: parseInt(partsOfFileName[1]?.replace("w", "")), // e.g. 'w800' -> '800'
        lvl: (partsOfFileName[2] ?? "").startsWith("lvl") ? parseInt(partsOfFileName[2].slice(3, 4)) : "-",
        q: (partsOfFileName[2] ?? "").startsWith("q") ? parseInt(partsOfFileName[2].slice(1)) : "-",
        compression: file.includes("lossy") ? "STRATNA" : "BEZSTRATNA",
        fileType: file.split(".")[1],
        interlaced: file.includes("progressive") || file.includes("interlaced") ? "TAK" : "NIE",
        ref: referenceFileName,
        ssim: ssimResult.ssim,
        mcs: ssimResult.mcs,
      });
    }
  }

  // Create a new Excel workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Files");

  // Define columns in the worksheet
  worksheet.columns = [
    { header: "Nazwa pliku", key: "name", width: 50 },
    { header: "Zdjęcie", key: "img", width: 20 },
    { header: "Format", key: "fileType", width: 20 },
    { header: "Szerokość", key: "width", width: 20 },
    { header: "Poziom kompresji", key: "lvl", width: 20 },
    { header: "Jakość zdjęcia", key: "q", width: 20 },
    { header: "Kopresja", key: "compression", width: 20 },
    { header: "Przeplot / Progresywność", key: "interlaced", width: 30 },
    { header: "Rozmiar pliku (bytes)", key: "size", width: 20 },
    { header: "Referencyjny plik", key: "ref", width: 30 },
    { header: "SSIM", key: "ssim", width: 15 },
    { header: "MCS", key: "mcs", width: 15 },
  ];

  // Add file data to the worksheet
  fileData.forEach((item) => {
    worksheet.addRow(item);
  });

  // Write the workbook to a file
  try {
    await workbook.xlsx.writeFile("files.xlsx");
    console.log("Excel file created successfully: files.xlsx");
  } catch (error) {
    console.error("Error creating Excel file:", error);
  }
}

// Run the main function
main().catch((err) => {
  console.error("Fatal error:", err);
});
