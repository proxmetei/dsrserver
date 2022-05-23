const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const router = express.Router();
 router.get('/users',checkRoleMiddleware('ADMIN'), userController.getAllUsers)
 router.post('/adddoctor',checkRoleMiddleware('ADMIN'), userController.addDoctor)
module.exports = router;