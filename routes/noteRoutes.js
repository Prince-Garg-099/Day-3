// routes/noteRoutes.js
const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const authenticateToken = require('../middleware/authentication');
const authorizeRole = require('../middleware/authorization');

// Create a new note by only admin (POST)
router.post('/', authenticateToken, authorizeRole('admin'), noteController.createNote);

//  user and admin role can only Get all notes (GET)
router.get('/', authenticateToken, noteController.getAllNotes);

// Delete a note by id only by admin (DELETE)
router.delete('/:id', authenticateToken, authorizeRole('admin'), noteController.deleteNote);

module.exports = router;
