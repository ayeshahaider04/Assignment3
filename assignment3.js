const express = require('express');
const path = require('path');
const connectDB = require('./server/config/db');
const itemRoutes = require('./server/routes/items');

const app = express();
const PORT = process.env.PORT || 3000;

// Set views directory and view engine
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
connectDB();

// Routes
app.use('/', itemRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


