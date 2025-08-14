// JavaScript
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    idMeal: { type: String, required: true }, // id della ricetta
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // id utente
    username: { type: String, required: true }, // nome utente che ha scritto la recensione
    rating: { type: Number, min: 1, max: 5 }, // voto generale (opzionale)
    preparationDate: { type: Date, required: true }, // data di preparazione
    difficulty: { type: Number, min: 1, max: 5, required: true }, // difficoltà 1-5
    comment: { type: String }, // testo recensione
  },
  { timestamps: true },
);

module.exports = mongoose.model('Review', reviewSchema);
