const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 5000;
const recipeRoutes = require('./routes/recipes');
const userRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const sUserRoutes = require('./routes/user');
const alluserRoutes = require('./routes/alluser');
const getuserRoutes = require('./routes/getuser');

//  dotenv
require('dotenv').config();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

// Routes
app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);
app.use('/users', loginRoutes);
app.use('/users', logoutRoutes);
app.use('/users', sUserRoutes);
app.use('/users', alluserRoutes);
app.use('/users', getuserRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
