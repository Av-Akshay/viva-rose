const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productCode: { type: String, required: true },
    productName: { type: String, required: true },
    productType: { type: String, required: true }, // e.g., ring, necklace, bracelet
    material: { type: String, default: 'Silver' },
    colour: {type: String},
    length: {type: Number},
    width: {type: Number},
    height: {type: Number},
    lwhUnit: {type: String, default: 'cm'},
    materialWeight: {type: Number},
    materialUnit: {type: String, default: 'gram'},
    stock: { type: Number, default: 0 },
    price: { type: Number, required: true },
    stockStatus: {type: String, required: true}, // e.g., in-stock, out-of-stock
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
