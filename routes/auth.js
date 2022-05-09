const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
 router.post('/login', userController.login)
 router.post('/register', userController.registration)
 router.get('/auth', userController.check);
module.exports = router;