const express = require('express');
const router = express.Router();
const StudySession = require('../models/studysession');

// Homepage
router.get('/', (req, res) => {
  res.render('index');
});

// List all study sessions
router.get('/sessions', async (req, res) => {
  const sessions = await StudySession.find().sort({ date: 1 });
  res.render('list', { sessions });
});

// Render Add Page
router.get('/add', (req, res) => {
  res.render('add');
});

// Add a new study session
router.post('/add', async (req, res) => {
  const { title, description, date, duration } = req.body;
  await new StudySession({ title, description, date, duration }).save();
  res.redirect('/sessions');
});

// Render Edit Page
router.get('/edit/:id', async (req, res) => {
  const session = await StudySession.findById(req.params.id);
  res.render('edit', { session });
});

// Update a study session
router.post('/edit/:id', async (req, res) => {
  const { title, description, date, duration } = req.body;
  await StudySession.findByIdAndUpdate(req.params.id, { title, description, date, duration });
  res.redirect('/sessions');
});

// Delete a study session
router.post('/delete/:id', async (req, res) => {
  await StudySession.findByIdAndDelete(req.params.id);
  res.redirect('/sessions');
});

module.exports = router;
