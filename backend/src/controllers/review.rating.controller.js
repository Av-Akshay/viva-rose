const ReviewRatingService = require('../services/review.rating.service.js');
const logger = require("../configs/winston.config.js");

// Create a new contact form
const createReviewRating = async (req, res, next) => {
  try {
    const reviewRating = await ReviewRatingService.createReview( req.user.id, req.body.jewelleryId, req.body);
    res.status(201).json({
      data: reviewRating,
    });
  } catch (error) {
    next(error);
  }
};

// Get all users
const getReviewById = async (req, res, next) => {
  try {
    const reviewRating = await ReviewRatingService.getReviewById(req.params.id);
    res.status(200).json({
      success: true,
      data: reviewRating,
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
const getReviewsByJewellery = async (req, res, next) => {
  try {
    const reviewRating = await ReviewRatingService.getReviewsByJewellery(req.body.jewelleryId);
    res.status(200).json({
      success: true,
      data: reviewRating,
    });
  } catch (error) {
    next(error);
  }
};

// Update user by ID
const updateReview = async (req, res, next) => {
  try {
    const updatedReviewRating = await ReviewRatingService.updateReview(req.user.id, req.body.reviewId, req.body);
    res.status(200).json({
      success: true,
      data: updatedReviewRating,
    });
  } catch (error) {
    //console.log(error);
    next(error);
  }
};

// Delete user by ID
const deleteReview = async (req, res, next) => {
  try {
    const review= await ReviewRatingService.deleteReview(req.user.id, req.body.reviewId);
    res.status(200).json({ message: "Review deleted successfully", review });
  } catch (error) {
    next(error);
  }
};

module.exports= {createReviewRating, getReviewById, getReviewsByJewellery, updateReview, deleteReview};
