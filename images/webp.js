#!/usr/bin/env node

const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const inputFile = process.argv[2];
if (!inputFile) {
  console.error("Usage: node convert_webp.js <input-file>");
  process.exit(1);
}

const baseName = path.basename(inputFile, path.extname(inputFile));

const qualities = [90, 80, 70, 60, 50, 40, 30, 20, 10];
const lossless = [true, false];
const sizes = ["1920", "800", 400];

const outputDir1 = "WEBP_LOSSY";
if (!fs.existsSync(outputDir1)) {
  fs.mkdirSync(outputDir1);
}

const outputDir2 = "WEBP_LOSSLESS";
if (!fs.existsSync(outputDir2)) {
  fs.mkdirSync(outputDir2);
}

for (const size of sizes) {
  for (const quality of qualities) {
    for (const v of lossless) {
      const losslessOption = v ? "-define webp:lossless=true" : "-define webp:lossless=false";
      const losslessName = v ? "lossless" : "lossy";

      const qualityOption = v ? "" : " -quality " + quality;
      const qualityName = v ? "_lvl" + quality / 10 : "_q" + quality;

      const outputFile = `${baseName}${size ? "_w" + size : ""}${qualityName}_${losslessName}.webp`;
      const cmd = `convert ${inputFile} ${size ? "-resize " + size + "x" : ""}${qualityOption} ${losslessOption} "${
        v ? "WEBP_LOSSLESS" : "WEBP_LOSSY"
      }/${outputFile}"`;

      console.log(cmd);
      exec(cmd, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error converting with quality ${quality}:`, err.message);
        } else {
          console.log(`Created: ${outputFile} (quality = ${quality})`);
        }
      });
    }
  }
}
