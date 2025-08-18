const Review = require('../models/Review');
const User = require('../models/User');

// Crea una recensione
exports.createReview = async (req, res) => {
  if (!req.userId) return res.status(401).send('Utente non autenticato');
  const user = await User.findById(req.userId);
  const username = user.username;

  try {
    const review = new Review({
      idMeal: req.body.idMeal,
      userId: req.userId,
      username: username,
      rating: req.body.rating,
      preparationDate: req.body.preparationDate,
      difficulty: req.body.difficulty,
      comment: req.body.comment,
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
  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.status(500).send('Errore nella cancellazione della recensione');
  }
};

exports.countReviews = async (req, res) => {
  if (!req.userId) return res.status(401).send('Utente non autenticato');
  try {
    let count = await Review.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('count reviews error', error);
    res.status(500).send('Errore del server');
  }
};

// Trova il meal con la media voto più alta
exports.getTopRatedMeal = async (req, res) => {
  try {
    const result = await Review.aggregate([
      {
        $group: {
          _id: '$idMeal',
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 },
        },
      },
      { $sort: { avgRating: -1, count: -1 } },
      { $limit: 1 },
    ]);
    if (result.length === 0) return res.status(404).send('Nessuna recensione trovata');
    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Errore nel recupero del top rated meal');
  }
};
