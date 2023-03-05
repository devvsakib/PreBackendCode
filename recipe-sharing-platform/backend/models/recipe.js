// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const recipeSchema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true }
// //   ingredients: { type: [String], required: true },
// //   instructions: { type: [String], required: true },
// //   category: { type: String, required: true },
// //   image: { type: String },
// //   createdAt: { type: Date, default: Date.now },
// //   updatedAt: { type: Date, default: Date.now }
// });

// const userSchema = new Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// const Recipe = mongoose.model('Recipe', recipeSchema);
// const User = mongoose.model('User', userSchema);

// module.exports = { Recipe, User };
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
