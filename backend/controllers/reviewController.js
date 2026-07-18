const Review = require('../models/Review');
const reviewCode = require('../utils/groqClient');

const createReview = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !code.trim()) {
      return res.status(400).json({ message: 'Code is required' });
    }
    if (!language) {
      return res.status(400).json({ message: 'Language is required' });
    }

    const feedback = await reviewCode(code, language);

    const review = await Review.create({
      user: req.userId,
      code,
      language,
      feedback,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id, user: req.userId });
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createReview, getReviews, getReviewById };