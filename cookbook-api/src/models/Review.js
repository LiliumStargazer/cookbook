// JavaScript
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    idRecipe: { type: String, required: true }, // id della ricetta
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // id utente
    rating: { type: Number, min: 1, max: 5 }, // voto generale (opzionale)
    preparationDate: { type: Date, required: true }, // data di preparazione
    difficulty: { type: Number, min: 1, max: 5, required: true }, // difficoltà 1-5
    comment: { type: String }, // testo recensione
  },
  { timestamps: true },
);

module.exports = mongoose.model('Review', reviewSchema);
