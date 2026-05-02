const express = require('express');
const { getUserProjects, getProject, updateProject, deleteProject } = require('../controllers/projectController');
const auth = require('../utils/auth');
const router = express.Router();

router.get('/', auth, getUserProjects);
router.get('/:id', auth, getProject);
router.patch('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;
