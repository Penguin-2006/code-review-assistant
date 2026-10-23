const mongoose = require('mongoose');
const Review = require('../models/Review');
const reviewCode = require('../utils/groqClient');

const ALLOWED_LANGUAGES = ['javascript', 'python', 'java', 'c++', 'typescript', 'go'];
const MAX_CODE_LENGTH = 5000;

const createReview = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (typeof code !== 'string' || !code.trim()) {
      return res.status(400).json({ message: 'Code is required' });
    }
    if (typeof language !== 'string' || !ALLOWED_LANGUAGES.includes(language)) {
      return res.status(400).json({ message: 'Unsupported language' });
    }
    if (code.length > MAX_CODE_LENGTH) {
      return res.status(400).json({ message: `Code exceeds maximum length of ${MAX_CODE_LENGTH} characters` });
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
    console.error('Create review error:', err);
    res.status(500).json({ message: 'Failed to generate review, please try again' });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    console.error('Get reviews error:', err);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};

const getReviewById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const review = await Review.findOne({ _id: req.params.id, user: req.userId });
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (err) {
    console.error('Get review by id error:', err);
    res.status(500).json({ message: 'Failed to fetch review' });
  }
};

module.exports = { createReview, getReviews, getReviewById };