const { exec } = require("child_process");
const path = require("path");

const inputFile = process.argv[2];
if (!inputFile) {
  console.error("Usage: node index.js <input-file>");
  process.exit(1);
}

const baseName = path.basename(inputFile, path.extname(inputFile));

const sizes = ["1920", "800", "400"];

for (const size of sizes) {
  const resizeOption = size ? `-resize ${size}x` : "";
  const resizeName = size ? `_w${size}` : "";

  const outputFile = `${baseName}${resizeName}.png`;

  const cmd = `convert "${inputFile}" ${resizeOption} "${outputFile}"`;

  exec(cmd, (err, stdout, stderr) => {
    console.log(cmd);
    if (err) {
      console.error(`Error converting with compression`, err.message);
    } else {
      console.log(`Created: ${outputFile} (compression-leve)`);
    }
  });
}
