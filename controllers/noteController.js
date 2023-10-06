const Note = require('../models/Note');

// Create a new note
exports.createNote = (req, res) => {
  Note.create(req.body).then(() => {
    res.status(200);
    res.send("note created success");
  }).catch((err) => {
    res.status(400);
    res.send(err);
  });
};

// Get all notes
exports.getAllNotes = (req, res) => {
  var allnotes = Note.findAll();
  console.log(allnotes)
  res.send(allnotes);
};

// Delete a note by ID
exports.deleteNote = (req, res) => {

  const noteId = req.params.id;
  Note.destroy({
    where: {
      id: noteId
    }
  }).then(() => {
    res.json({ message: 'Note deleted successfully' });
  })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete Note' });
    });
};

