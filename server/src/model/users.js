const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    password: {type: String, required: true},
    confirmPassword:String,
    email: String,
    address:String, 
    avatarName: {type: String, default: 'defaultAvatar.png'}
  });
  
  const Users = mongoose.model('Users', userSchema);
  module.exports = Users