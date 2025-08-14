const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  idMeal: String,
  strMeal: { type: String, required: true },
  strCategory: String,
  strArea: String,
  strInstructions: String,
  strMealThumb: String,
  strTags: String,
  strYoutube: String,
  strIngredients: [String], // array di ingredienti
  strMeasures: [String], // array di misure
  note: { type: String, default: '', trim: true }, // nota dell'utente
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Recipe', recipeSchema);
