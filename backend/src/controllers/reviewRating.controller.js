const ReviewRatingService = require('../services/reviewRating.service.js');

// Create a new contact form
const createReviewRating = async (req, res, next) => {
  try {
    const reviewRating = await ReviewRatingService.createReview(req.body.productId, req.user.id, req.body);
    res.status(201).json({
      data: reviewRating,
    });
  } catch (error) {
    next(error);
  }
};

module.exports= {createReviewRating};
