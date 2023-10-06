const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authentication');
//const authorizeRole = require('../middleware/authorization');

router.get('/profile', authenticateToken, userController.getProfile);

module.exports = router;
