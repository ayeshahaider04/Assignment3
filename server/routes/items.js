const express = require('express');
const router = express.Router();
const StudySession = require('../models/studysession');

// Homepage
router.get('/', (req, res) => {
  res.render('index');
});

// List all study sessions
router.get('/sessions', async (req, res) => {
  try {
    const sessions = await StudySession.find().sort({ date: 1 });
    res.render('list', { sessions });
  } catch (err) {
    console.error('Error fetching sessions:', err.message);
    res.status(500).render('error', { message: 'Error fetching sessions.' });
  }
});

// Render Add Page
router.get('/add', (req, res) => {
  res.render('add');
});

// Add a new study session
router.post('/add', async (req, res) => {
  try {
    const { title, description, date, duration } = req.body;
    const newSession = new StudySession({ title, description, date, duration });
    await newSession.save();
    res.redirect('/sessions');
  } catch (err) {
    console.error('Error adding session:', err.message);
    res.status(500).render('error', { message: 'Error adding session.' });
  }
});

// Render Edit Page
router.get('/edit/:id', async (req, res) => {
  try {
    const session = await StudySession.findById(req.params.id);
    if (!session) {
      return res.status(404).render('error', { message: 'Session not found.' });
    }
    res.render('edit', { session });
  } catch (err) {
    console.error('Error fetching session:', err.message);
    res.status(500).render('error', { message: 'Error fetching session.' });
  }
});

// Update a study session
router.post('/edit/:id', async (req, res) => {
  try {
    const { title, description, date, duration } = req.body;
    const updatedSession = await StudySession.findByIdAndUpdate(
      req.params.id,
      { title, description, date, duration },
      { new: true, runValidators: true }
    );
    if (!updatedSession) {
      return res.status(404).render('error', { message: 'Session not found.' });
    }
    res.redirect('/sessions');
  } catch (err) {
    console.error('Error updating session:', err.message);
    res.status(500).render('error', { message: 'Error updating session.' });
  }
});

// Delete a study session
router.post('/delete/:id', async (req, res) => {
  try {
    const deletedSession = await StudySession.findByIdAndDelete(req.params.id);
    if (!deletedSession) {
      return res.status(404).render('error', { message: 'Session not found.' });
    }
    res.redirect('/sessions');
  } catch (err) {
    console.error('Error deleting session:', err.message);
    res.status(500).render('error', { message: 'Error deleting session.' });
  }
});

module.exports = router;




