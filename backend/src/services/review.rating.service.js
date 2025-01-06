const { NotFoundError } = require("../errors/errors");
const ReviewRating = require("../models/review.rating.model");
const Product = require("../models/product.model.js");
const {uploadImages, uploadImage} = require('../utils/upload.image.service.js');

const createReview = async (userId, productId, reviewData) => {
    const product = await Product.findById({ productId });
    if(!product){
        throw new NotFoundError("Product not found");
    }
    const imageURLs = await uploadImages(file);
    const reviewRating = new ReviewRating();
    reviewRating.productId= productId;
    reviewRating.userId=userId;
    reviewRating.rating=reviewData.rating;
    reviewRating.reviewText=reviewData.reviewText;
    reviewRating.reviewImages=imageURLs;

    await reviewRating.save();
    product.ratingReview.push(reviewRating._id);
    await user.save();
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

const updateReview = async (userId, reviewId, reviewData) => {
    
    const review = await ReviewRating.findById({ reviewId });
    if(!review){
        throw new NotFoundError("Review not found");
    }
    const user= await userService.getUserById(userId);
    // Ensure the user has the 'admin' role
    if (user.role === 'Admin' || review.userId === user._id) {
        throw new BadRequestError('Only admins and review creator can update reviews');
    }
    const imageURLs = await uploadImages(file);
    reviewData.reviewImages=imageURLs;

    return await ReviewRating.findByIdAndUpdate(reviewId, reviewData, { new: true });
};

const deleteReview = async (userId, reviewId) => {
    const review = await ReviewRating.findById({ reviewId });
    if(!review){
        throw new NotFoundError("Review not found");
    }
    const product= review.productId;
    if(!product){
        throw new NotFoundError("Product not found");
    }
    const user= await userService.getUserById(userId);
    // Ensure the user has the 'admin' role
    if (user.role === 'Admin' || review.userId === user._id) {
        throw new BadRequestError('Only admins and review creator can update reviews');
    }

    await ReviewRating.findByIdAndDelete(reviewId);
    
    product.reviewRating = product.reviewRating.filter(
        (id) => id.toString() !== reviewId.toString()
    );
    await product.save();
    
    return review;
};

module.exports = {
    createReview,
    getReviewsByProduct,
    getReviewById,
    updateReview,
    deleteReview,
};
