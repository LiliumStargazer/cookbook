// JavaScript
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  idMeal: { type: String, required: true }, // id della ricetta
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // id utente
  rating: { type: Number, min: 1, max: 5 }, // voto generale (opzionale)
  comment: { type: String } // testo recensione
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);