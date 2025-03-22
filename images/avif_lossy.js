#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure input file is provided
const inputFile = process.argv[2];
if (!inputFile) {
  process.exit(1);
}

// Extract base name (without extension)
const baseName = path.basename(inputFile, path.extname(inputFile));

// Quality levels for lossy AVIF
const lossyLevels = [90, 80, 70, 60, 50, 40, 30, 20, 10];

// Different sizes (empty for original, '800' for 800px width)
const sizes = ['1920', '800', '400'];

// Create output directory if it doesn't exist
const outputDir = 'AVIF_LOSSY';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Function to execute a command synchronously
const runCommand = async (cmd) => {
  try {
    console.log(`Running: ${cmd}`);
    execSync(cmd, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing: ${cmd}`);
    console.error(error.message);
  }
};

// Process images sequentially
const processImages = async () => {
  for (const size of sizes) {
    for (const level of lossyLevels) {
      const outputFile = `${baseName}${size ? '_w' + size : ''}_q${level}_lossy.avif`;
      const outputPath = `${outputDir}/${outputFile}`;
      const resizeOption = size ? `-resize ${size}x` : '';

      const cmd = `convert "${inputFile}" ${resizeOption} -quality ${level} "${outputPath}"`;

      await runCommand(cmd); // Process one by one
    }
  }
  console.log('✅ All images processed sequentially.');
};

// Run the processing function
processImages();
