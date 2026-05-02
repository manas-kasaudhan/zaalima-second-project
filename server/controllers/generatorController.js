const { generateExtensionCode } = require('../utils/llmPrompt');
const { createExtensionZip } = require('../utils/fileManager');
const { sanitizeGeneratedCode } = require('../utils/security');
const Project = require('../models/Project');

const generate = async (req, res) => {
  try {
    const { prompt, title, userId } = req.body;
    
    // 1. Generate code from LLM
    let files = await generateExtensionCode(prompt);
    
    // 2. Sanitize code
    files = sanitizeGeneratedCode(files);
    
    // 3. Create Zip
    const zipFileName = await createExtensionZip(files);
    const zipUrl = `/downloads/${zipFileName}`;
    
    // 3. Save project if userId is provided
    let project = null;
    if (userId) {
      project = new Project({
        userId,
        title: title || 'New Extension',
        prompt,
        files,
        zipUrl
      });
      await project.save();
    }
    
    res.json({
      message: 'Extension generated successfully',
      files,
      zipUrl,
      project: project ? { id: project._id, title: project.title } : null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generate };
