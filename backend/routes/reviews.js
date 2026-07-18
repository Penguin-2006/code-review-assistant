const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { createReview, getReviews, getReviewById } = require('../controllers/reviewController');
const { reviewLimiter } = require('../middleware/rateLimiter');

router.post('/', protect, reviewLimiter, createReview);
router.get('/', protect, getReviews);
router.get('/:id', protect, getReviewById);

module.exports = router;