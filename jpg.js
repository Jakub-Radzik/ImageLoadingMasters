const { exec } = require('child_process');
const path = require('path');

const inputFile = process.argv[2];
if (!inputFile) {
  console.error('Usage: node index.js <input-file>');
  process.exit(1);
}

const baseName = path.basename(inputFile, path.extname(inputFile));

const sizes = ['1920', '800', '400'];
const qualities = [90, 80, 70, 60, 50,40,30,20,10];
const interlaced = [true, false];

for(const size of sizes) {
  for(const quality of qualities) {
    for(const v of interlaced){
      const outputFile = `${baseName}${size ? '_w' + size : ''}_q${quality}_lossy${v?'_progressive':''}.jpg`;
      const resizeOption = size ? `-resize ${size}x` : '';

      const interlacedOption = v ? '-interlace JPEG' : '';

      const cmd = `convert "${inputFile}" ${resizeOption} ${interlacedOption} -quality ${quality} "${outputFile}"`;
  
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
