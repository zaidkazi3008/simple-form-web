const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  username: String,
  phoneNumber: String,
  email: String,
  name: String,
  dateOfBirth: String,
});

module.exports = mongoose.model('Form', formSchema);
