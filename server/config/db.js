const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
    });
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit the app if the database connection fails
  }
};

// Debugging MongoDB connection
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected.');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
});

module.exports = connectDB;



  
