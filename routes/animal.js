const express = require('express');
const animalController = require('../controllers/animalController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
 router.post('/edit', animalController.edit)
module.exports = router;