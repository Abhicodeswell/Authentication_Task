// db.js
const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://127.0.0.1:27017/LoginUser';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  
db.once('open', () => {
    console.log('Connected to MongoDB');
});
  
db.once('disconnected', () => {
    console.log('Disconnected from MongoDB');
});
  
db.on('reconnected', () => {
    console.log('Reconnected to MongoDB');
});
  
db.on('close', () => {
    console.log('Connection to MongoDB closed');
});
  

module.exports = db;
