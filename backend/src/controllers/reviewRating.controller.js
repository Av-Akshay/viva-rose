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

// Get all users
const getReviewById = async (req, res, next) => {
  try {
    const reviewRating = await ReviewRatingService.getReviewById(req.body.reviewId);
    res.status(200).json({
      success: true,
      data: reviewRating,
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
const getReviewsByProduct = async (req, res, next) => {
  try {
    const reviewRating = await ReviewRatingService.getReviewsByProduct(req.body.productId);
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
    logger.info(
      "Review id:" + `${updatedReviewRating._id}` + " has been updated successfully"
    );
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
    await ReviewRatingService.deleteReview(req.user.id, req.body.reviewId);
    logger.info(
      "Review id:" + `${reviewId}` + " has been deleted successfully"
    );
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports= {createReviewRating, getReviewById, getReviewsByProduct, updateReview, deleteReview};
