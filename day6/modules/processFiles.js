const readFileAsync = require('./readFileAsync');
const writeFileAsync = require('./writeFileAsync');

async function processFiles() {
  try {
    const inputPath = './data/input.txt';
    const outputPath = './data/output.txt';

    const originalText = await readFileAsync(inputPath);

    // ✨ Manipulate the content
    const timestamp = new Date().toISOString();
    const modified = `${timestamp}\n\n${originalText.toUpperCase().split('').reverse().join('')}`;

    await writeFileAsync(outputPath, modified);

    console.log('File processed successfully.');
  } catch (error) {
    console.error(error);
  }
}

module.exports = processFiles;
