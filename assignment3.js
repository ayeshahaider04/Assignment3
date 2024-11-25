const express = require('express');
const path = require('path');
const connectDB = require('./server/config/db');
require('dotenv').config(); // Ensure dotenv is loaded

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Template engine
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'ejs');

// Routes
const itemRoutes = require('./server/routes/items');
app.use('/', itemRoutes);

// Error handling
app.use((req, res) => res.status(404).render('404', { message: 'Page Not Found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: 'An error occurred!' });
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));






