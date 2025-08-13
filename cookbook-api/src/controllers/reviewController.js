const Review = require('../models/Review');

// Crea una recensione
exports.createReview = async (req, res) => {
  console.log('sono req body', req.body);
  console.log('sono req userId', req.userId);
  console.log('taste',req.body.rating);
  console.log('comment',req.body.comment);
  console.log('recipeId',req.body.recipeId);

  if (!req.userId) return res.status(401).send('Utente non autenticato');
  try {
    const review = new Review({
      idMeal: req.body.recipeId,
      userId: req.userId,
      rating: req.body.rating,
      comment: req.body.comment
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).send('Errore nella creazione della recensione');
  }
};

// tutte le recensioni per una ricetta
exports.getReviewsByMeal = async (req, res) => {
  try {
    const reviews = await Review.find({ idMeal: req.params.idMeal });
    res.json(reviews);
  } catch {
    res.status(500).send('Errore nel recupero delle recensioni');
  }
};

// Cancella una recensione
exports.deleteReview = async (req, res) => {
  if (!req.userId) return res.status(401).send('Utente non autenticato');
  try {
    const result = await Review.deleteOne({ _id: req.params.id, userId: req.userId });
    if (result.deletedCount === 0) return res.status(404).send('Recensione non trovata');
    res.status(204).send();
  } catch (err) {
    res.status(500).send('Errore nella cancellazione della recensione');
  }
};