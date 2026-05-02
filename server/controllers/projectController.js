const Project = require('../models/Project');
const { generateExtensionCode } = require('../utils/llmPrompt');
const { createExtensionZip } = require('../utils/fileManager');

const getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.user.id });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { prompt, title } = req.body;
    const project = await Project.findOne({ _id: req.params.id, userId: req.user.id });
    
    if (!project) return res.status(404).json({ error: 'Project not found' });

    // If a new prompt is provided, regenerate the code
    if (prompt && prompt !== project.prompt) {
      const files = await generateExtensionCode(`Update this extension: ${prompt}. Previous context: ${project.prompt}`);
      const zipFileName = await createExtensionZip(files);
      project.files = files;
      project.zipUrl = `/downloads/${zipFileName}`;
      project.prompt = prompt;
      project.version += 1;
    }

    if (title) project.title = title;
    
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    await Project.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUserProjects, getProject, updateProject, deleteProject };
