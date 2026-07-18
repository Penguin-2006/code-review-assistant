const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { createReview, getReviews, getReviewById } = require('../controllers/reviewController');

router.post('/', protect, createReview);
router.get('/', protect, getReviews);
router.get('/:id', protect, getReviewById);

module.exports = router;