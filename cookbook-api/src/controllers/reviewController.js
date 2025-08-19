const Review = require('../models/Review');
const User = require('../models/User');

// Create a review
exports.createReview = async (req, res) => {
  if (!req.userId)
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'User not authorized',
    });
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({
      error: 'UserNotFound',
      message: 'User not found',
    });
  }
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
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Error creating review',
    });
  }
};

// All reviews for a recipe
exports.getReviewsByMeal = async (req, res) => {
  try {
    const reviews = await Review.find({ idMeal: req.params.idMeal });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Error retrieving reviews for the recipe',
    });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  if (!req.userId)
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'User not authorized',
    });
  try {
    const response = await Review.deleteOne({ _id: req.params.id, userId: req.userId });
    if (response.deletedCount === 0)
      return res.status(404).json({
        error: 'NotFound',
        message: 'Review not found',
      });
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting review', err);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Error deleting review',
    });
  }
};

exports.countReviews = async (req, res) => {
  if (!req.userId)
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'User not authorized',
    });
  try {
    let count = await Review.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Count reviews error', error);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Error counting reviews',
    });
  }
};

// Find the meal with the highest average rating
exports.getTopRatedMeal = async (req, res) => {
  try {
    const response = await Review.aggregate([
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
    if (response.length === 0)
      return res.status(404).json({
        error: 'NotFound',
        message: 'Nessuna recensione trovata',
      });
    res.json(response[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Errore nel recupero del top rated meal',
    });
  }
};
