#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');

const inputFile = process.argv[2];
if (!inputFile) {
  console.error('Usage: node convert_webp.js <input-file>');
  process.exit(1);
}

const baseName = path.basename(inputFile, path.extname(inputFile));

const qualities = [90, 80, 70, 60, 50, 40, 30, 20, 10];
const lossless = [true, false]
const sizes = ['1920' , '800', 400]

for(const size of sizes) {
  for(const quality of qualities) {
    for(const v of lossless){
      const losslessOption = v ? '-define webp:lossless=true' : '-define webp:lossless=false';
      const losslessName = v ? 'lossless' : 'lossy';

      const outputFile = `${baseName}${size? '_w'+size:''}_q${quality}_${losslessName}.webp`;
      const cmd = `convert ${inputFile} ${size ? '-resize '+size+'x' : ''} -quality ${quality} ${losslessOption} "${v ? 'WEBP_LOSSLESS' : 'WEBP_LOSSY'}/${outputFile}"`;
  
      console.log(cmd)
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


