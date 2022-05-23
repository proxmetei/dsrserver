const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
 router.post('/login', userController.login)
 router.post('/register', userController.registration)
 router.get('/auth',authMiddleware, userController.check);
 router.post('/info', userController.userInfo);
 router.post('/edit', userController.edit);
 router.get('/docs',authMiddleware, userController.getDocs);
 router.post('/setsession',authMiddleware, userController.setSession);
module.exports = router;