const mongoose = require('mongoose');

// Hardcoded MongoDB connection string
const MONGO_URI = 'mongodb+srv://ayeshahaider:ayesha123@assignment3.mjqrv.mongodb.net/?retryWrites=true&w=majority&appName=Assignment3';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 50000, // Timeout after 50 seconds
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


  
