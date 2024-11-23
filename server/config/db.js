const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://ayeshahaider:ayesha123@assignment3.mjqrv.mongodb.net/?retryWrites=true&w=majority&appName=Assignment3';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
