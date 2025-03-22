const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const inputFile = process.argv[2];
if (!inputFile) {
  console.error("Usage: node index.js <input-file>");
  process.exit(1);
}

const baseName = path.basename(inputFile, path.extname(inputFile));

const sizes = ["1920", "800", "400"];
const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const interlaced = [true, false];

const outputDir = "PNG";
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

for (const size of sizes) {
  for (const level of levels) {
    for (const v of interlaced) {
      const interlacedOption = v ? "-interlace PNG" : "";
      const interlaceName = v ? "_interlaced" : "";

      const levelOption = `-define png:compression-level=${level}`;
      const levelName = `_lvl${level}`;

      const resizeOption = size ? `-resize ${size}x` : "";
      const resizeName = size ? `_w${size}` : "";

      const outputFile = `${baseName}${resizeName}${levelName}${interlaceName}.png`;

      const cmd = `convert "${inputFile}" ${resizeOption} ${levelOption} ${interlacedOption} "PNG/${outputFile}"`;

      exec(cmd, (err, stdout, stderr) => {
        console.log(cmd);
        if (err) {
          console.error(`Error converting with compression level ${level}:`, err.message);
        } else {
          console.log(`Created: ${outputFile} (compression-level = ${level})`);
        }
      });
    }
  }
}
