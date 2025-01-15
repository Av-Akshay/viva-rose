const { NotFoundError } = require("../errors/errors");
const ReviewRating = require("../models/review.rating.model");
const Jewellery = require("../models/jewellery.model.js");
const {uploadImages, uploadImage} = require('../utils/image.upload.util.js');
const User = require('../models/user.model.js');

const createReview = async (userId, jewelleryId, reviewData, files) => {
    const jewellery = await Jewellery.findById(jewelleryId);
    if(!jewellery){
        throw new NotFoundError("Jewellery not found");
    }
    const reviewRating = new ReviewRating();
    reviewRating.jewelleryId= jewelleryId;
    reviewRating.userId=userId;
    reviewRating.rating=reviewData.rating;
    reviewRating.reviewText=reviewData.reviewText;
    if(files){
        const imageURLs = await uploadImages(files);
        reviewRating.reviewImages=imageURLs;
    }
    
    await reviewRating.save();
    jewellery.ratingReview.push(reviewRating._id);
    await jewellery.save();
    return reviewRating;
};

const getReviewsByJewellery = async (jewelleryId) => {
    const jewellery = await Jewellery.findById(jewelleryId);
    if(!jewellery){
        throw new NotFoundError("Jewellery not found");
    }

    const reviews = await ReviewRating.find(jewelleryId).populate("userId").populate("jewelleryId");
    if(!reviews){
        throw new NotFoundError("Reviews not found");
    }
    return reviews;
};

const getReviewById = async (reviewId) => {
    const review = await ReviewRating.findById(reviewId);
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

    return await ReviewRating.findByIdAndUpdate(reviewId, reviewData, { new: true });
};

const deleteReview = async (userId, reviewId) => {
    const review = await ReviewRating.findById(reviewId);
    if(!review){
        throw new NotFoundError("Review not found");
    }
    const jewellery= await Jewellery.findById(review.jewelleryId);
    console.log(jewellery.reviews);
    if(!jewellery){
        throw new NotFoundError("Jewellery not found");
    }
    const user= await User.findById(userId);
    // Ensure the user has the 'admin' role
    if (user.role === 'Admin' || review.userId === user._id) {
        throw new BadRequestError('Only admins and review creator can update reviews');
    }

    await ReviewRating.findByIdAndDelete(reviewId);
    
    jewellery.reviews = jewellery.reviews.filter(
        (id) => id.toString() !== reviewId.toString()
    );
    await jewellery.save();
    console.log(jewellery);
    return review;
};

module.exports = {
    createReview,
    getReviewsByJewellery,
    getReviewById,
    updateReview,
    deleteReview,
};
