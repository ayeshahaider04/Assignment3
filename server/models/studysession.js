const mongoose = require('mongoose');

const studySessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('StudySession', studySessionSchema);

