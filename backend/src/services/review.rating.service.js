const { NotFoundError, BadRequestError } = require("../errors/errors");
const Review = require("../models/review.rating.model");
const Jewellery = require("../models/jewellery.model.js");
const {uploadImages, uploadImage} = require('../utils/image.upload.util.js');
const User = require('../models/user.model.js');

const createReview = async (userId, jewelleryId, reviewData, files) => {
    const jewellery = await Jewellery.findById(jewelleryId);
    if(!jewellery){
        throw new NotFoundError("Jewellery not found");
    }
    const user = await User.findById(userId);
    if(!user){
        throw new NotFoundError("User not found");
    }
    const review = new Review();
    review.jewelleryId= jewelleryId;
    review.userId=userId;
    review.rating=reviewData.rating;
    review.reviewText=reviewData.reviewText;
    if(files){
        const imageURLs = await uploadImages(files);
        review.reviewImages=imageURLs;
    }
    
    await review.save();
    var totalRating=0;
    jewellery.reviews.push(review._id);
    await jewellery.save();
    const allReviews = await Jewellery.findById(jewelleryId).populate("reviews");
    
    allReviews.reviews.forEach(item => {
    totalRating += item.rating;});
    
    jewellery.avgRating=totalRating/jewellery.reviews.length;
    await jewellery.save();

    user.reviews.push(review._id);
    await user.save();
    return review;
};

const getAllReviews = async () => {

    const reviews = await Review.find().populate("userId", ["profilePic", "name", "createdAt"]);
    if(!reviews){
        throw new NotFoundError("Reviews not found");
    }
    return reviews;
};

const getReviewById = async (reviewId) => {
    const review = await Review.findById(reviewId).populate("userId", ["profilePic", "name", "createdAt"]);

    if(!review){
        throw new NotFoundError("Review not found");
    }
    return review;
};

const updateReview = async (userId, reviewId, reviewData, files) => {
    
    const review = await Review.findById(reviewId);
    if(!review){
        throw new NotFoundError("Review not found");
    }
    const user= await User.findById(userId);
    
    // Ensure the user has the 'admin' role
    if ((user.role !== 'Admin') && (review.userId.toString() !== user._id.toString())) {
        throw new BadRequestError('Only admins and review creator can delete reviews');
    }

    if(reviewData.reviewText){
        review.reviewText=reviewData.reviewText;
    }
    if(reviewData.rating){
        review.rating=reviewData.rating;
    }
    if(files){
        const imageURLs = await uploadImages(files);
        review.reviewImages=imageURLs;
    }
    await review.save();

    var totalRating=0;
    const jewellery = await Jewellery.findById(review.jewelleryId);
    const allReviews = await Jewellery.findById(review.jewelleryId).populate("reviews");
    
    allReviews.reviews.forEach(item => {
    totalRating += item.rating;});
    
    jewellery.avgRating=totalRating/jewellery.reviews.length;
    await jewellery.save();

    return review;
};

const deleteReview = async (userId, reviewId) => {
    const review = await Review.findById(reviewId);
    if(!review){
        throw new NotFoundError("Review not found");
    }
    const jewellery= await Jewellery.findById(review.jewelleryId);
    
    if(!jewellery){
        throw new NotFoundError("Jewellery not found");
    }
    
    const user= await User.findById(userId);
    
    // Ensure the user has the 'admin' role
    if ((user.role !== 'Admin') && (review.userId.toString() !== user._id.toString())) {
        throw new BadRequestError('Only admins and review creator can delete reviews');
    }

    await Review.findByIdAndDelete(reviewId);
    
    jewellery.reviews = jewellery.reviews.filter(
        (id) => id.toString() !== reviewId.toString()
    );
    await jewellery.save();

    var totalRating=0;
    const allReviews = await Jewellery.findById(review.jewelleryId).populate("reviews");
    
    allReviews.reviews.forEach(item => {
    totalRating += item.rating;});
    
    jewellery.avgRating=totalRating/jewellery.reviews.length;
    await jewellery.save();

    user.reviews = user.reviews.filter(
        (id) => id.toString() !== reviewId.toString()
    );
    await user.save();
    return review;
};

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
};
