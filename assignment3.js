const express = require('express');
const path = require('path');
const connectDB = require('./server/config/db');
const itemRoutes = require('./server/routes/items');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

connectDB();

app.use('/', itemRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
