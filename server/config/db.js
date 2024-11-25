const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

console.log('MONGO_URI:', MONGO_URI); // Debug log to confirm MONGO_URI is loaded

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 50000,
    });
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit the app if the database connection fails
  }
};

// MongoDB connection events for debugging
mongoose.connection.on('connected', () => console.log('MongoDB connected.'));
mongoose.connection.on('error', (err) => console.error('MongoDB error:', err.message));

module.exports = connectDB;


  
