const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6
  }
});

userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
