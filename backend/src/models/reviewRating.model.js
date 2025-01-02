const mongoose = require("mongoose");

const ratingReviewSchema = new mongoose.Schema({
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Jewelry',  // Reference to the jewelry item being reviewed
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',  // Reference to the user who wrote the review
        required: true 
    },
    rating: {
        type: Number, 
        required: true, 
        min: 1, 
        max: 5,  // Rating between 1 to 5 stars
    },
    reviewImages: [{ type: String}],
    reviewText: { 
        type: String, 
        required: true,
        minlength: 10, // Minimum length of the review text
        maxlength: 1000, // Maximum length for detailed review
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

ratingReviewSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const ReviewRating= mongoose.model("ReviewRating", ratingReviewSchema);
module.exports= ReviewRating;