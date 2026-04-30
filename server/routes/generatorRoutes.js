const express = require('express');
const { generate } = require('../controllers/generatorController');
const router = express.Router();

router.post('/', generate);

module.exports = router;
