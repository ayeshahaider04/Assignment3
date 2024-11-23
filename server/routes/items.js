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
    console.log('Fetching study sessions from the database...');
    const sessions = await StudySession.find().sort({ date: 1 });
    console.log('Study sessions fetched:', sessions);
    res.render('list', { sessions });
  } catch (err) {
    console.error('Error fetching sessions:', err.message);
    res.status(500).send('Internal Server Error');
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
    await new StudySession({ title, description, date, duration }).save();
    res.redirect('/sessions');
  } catch (err) {
    console.error('Error adding session:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Render Edit Page
router.get('/edit/:id', async (req, res) => {
  try {
    const session = await StudySession.findById(req.params.id);
    res.render('edit', { session });
  } catch (err) {
    console.error('Error fetching session:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Update a study session
router.post('/edit/:id', async (req, res) => {
  try {
    const { title, description, date, duration } = req.body;
    await StudySession.findByIdAndUpdate(req.params.id, { title, description, date, duration });
    res.redirect('/sessions');
  } catch (err) {
    console.error('Error updating session:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a study session
router.post('/delete/:id', async (req, res) => {
  try {
    await StudySession.findByIdAndDelete(req.params.id);
    res.redirect('/sessions');
  } catch (err) {
    console.error('Error deleting session:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;




