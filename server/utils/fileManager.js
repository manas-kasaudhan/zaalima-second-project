const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');
const { v4: uuidv4 } = require('uuid');

const TMP_DIR = path.join(__dirname, '../tmp');

// Ensure tmp directory exists
fs.ensureDirSync(TMP_DIR);

/**
 * Creates a zip file from a JSON object representing files.
 * @param {Object} filesJson - { "filename": "content" }
 * @returns {Promise<string>} - Path to the generated zip file
 */
async function createExtensionZip(filesJson) {
  const projectId = uuidv4();
  const projectPath = path.join(TMP_DIR, projectId);
  const zipFilePath = path.join(TMP_DIR, `${projectId}.zip`);

  try {
    // 1. Create directory for the project
    await fs.ensureDir(projectPath);

    // 2. Write files
    for (const [filename, content] of Object.entries(filesJson)) {
      const filePath = path.join(projectPath, filename);
      // Ensure subdirectories exist if filename contains them (e.g., "icons/icon128.png")
      await fs.ensureDir(path.dirname(filePath));
      await fs.writeFile(filePath, content);
    }

    // 3. Create Zip
    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(zipFilePath);
      const archive = archiver('zip', { zlib: { level: 9 } });

      output.on('close', () => {
        // Cleanup: remove the project directory, keep the zip
        fs.remove(projectPath).catch(console.error);
        resolve(`${projectId}.zip`);
      });

      archive.on('error', (err) => reject(err));

      archive.pipe(output);
      archive.directory(projectPath, false);
      archive.finalize();
    });
  } catch (error) {
    console.error("Error creating zip:", error);
    // Cleanup if error occurs
    await fs.remove(projectPath).catch(() => {});
    throw error;
  }
}

module.exports = { createExtensionZip };
