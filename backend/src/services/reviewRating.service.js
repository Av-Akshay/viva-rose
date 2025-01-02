const { NotFoundError } = require("../errors/errors");
const ReviewRating = require("../models/reviewRating.model");
const {uploadImages, uploadImage} = require('../utils/upload.image.service.js');

const createReview = async (userId, productId, reviewData) => {
    const imageURLs = await uploadImages(file);
    const reviewRating = new ReviewRating();
    reviewRating.productId= productId;
    reviewRating.userId=userId;
    reviewRating.rating=reviewData.rating;
    reviewRating.reviewText=reviewData.reviewText;
    reviewRating.reviewImages=imageURLs;

    await reviewRating.save();

    return reviewRating;
};

const getReviewsByProduct = async (productId) => {
    const product = await Product.findById({productId});
    if(!product){
        throw new NotFoundError("Product not found");
    }

    const reviews = await ReviewRating.find({ productId }).populate("userId", "name").populate("productCode", "name");
    if(!reviews){
        throw new NotFoundError("Reviews not found");
    }
    return reviews;
};

const getReviewById = async (reviewId) => {
    const review = await ReviewRating.findById({ reviewId });
    if(!review){
        throw new NotFoundError("Review not found");
    }
    return review;
};

const updateReview = async (reviewId, reviewData) => {
    const review = await ReviewRating.findById({ reviewId });
    if(!review){
        throw new NotFoundError("Review not found");
    }
    const imageURLs = await uploadImages(file);
    reviewData.reviewImages=imageURLs;

    return await ReviewRating.findByIdAndUpdate(reviewId, reviewData, { new: true });
};

const deleteReview = async (reviewId) => {
    const review = await ReviewRating.findById({ reviewId });
    if(!review){
        throw new NotFoundError("Review not found");
    }
    await ReviewRating.findByIdAndDelete(reviewId);
    
    return review;
};

module.exports = {
    createReview,
    getReviewsByProduct,
    getReviewById,
    updateReview,
    deleteReview,
};
