const express = require('express');
const path = require('path');
const connectDB = require('./server/config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the template engine
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'ejs');

// Routes
const itemRoutes = require('./server/routes/items');
app.use('/', itemRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});





