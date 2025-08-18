// JavaScript
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');

router.post('/', auth, reviewController.createReview);
router.get('/count', auth, reviewController.countReviews);
router.get('/top-rated', auth, reviewController.getTopRatedMeal);
router.get('/:idMeal', auth, reviewController.getReviewsByMeal);
router.delete('/:id', auth, reviewController.deleteReview);

module.exports = router;
