const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productCode: { type: String, required: true },
    productName: { type: String, required: true },
    productType: { type: String, required: true }, // e.g., ring, necklace, bracelet
    material: { type: String, default: 'silver' },
    genderCategory: {type: String, default: 'women'}, // e.g. Women, Men, Kids
    colour: {type: String},
    materialWeight: {type: Number},
    materialUnit: {type: String, default: 'gram'},
    stockCount: { type: Number, default: 0 },
    price: { type: Number, required: true },
    stockStatus: {type: String, required: true, default: 'in-stock'}, // e.g., in-stock, out-of-stock //excludes out of stock
    description: { type: String },
    ratingReview: [{type: mongoose.Schema.Types.ObjectId,
        ref: "RatingReview"
    }],
    orders: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Order" 
    }],
    productImages: [{ type: String}],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
