const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');
const cors = require('cors');
require('dotenv').config();
require('./passport');

// Import the Task model
const Task = require('./models/Task');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


const tasksRouter = require('./routes/tasks');
const todoRouter = require('./routes/todos');
const usersRouter = require('./routes/users');

app.use('/tasks', tasksRouter);
app.use('/todos', todoRouter);
app.use('/users', usersRouter);



app.listen(5000, () => {
    console.log('Server started on port 5000');
});