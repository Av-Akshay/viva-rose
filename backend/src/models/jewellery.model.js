const mongoose = require("mongoose");

const jewellerySchema = new mongoose.Schema({
    jewelleryCode: { type: String, required: true },
    jewelleryName: { type: String, required: true },
    jewelleryType: { type: String, required: true }, // e.g., ring, necklace, bracelet
    material: { type: String, default: 'silver' },
    genderCategory: {type: String, default: 'women'}, // e.g. Women, Men, Kids
    colour: {type: String},
    materialWeight: {type: Number},
    materialUnit: {type: String, default: 'gram'},
    stockCount: { type: Number, default: 0 },
    price: { type: Number, required: true },
    stockStatus: {type: String, required: true, default: 'in-stock'}, // e.g., in-stock, out-of-stock //excludes out of stock
    description: { type: String },
    reviews: [{type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    orders: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Order" 
    }],
    jewelleryImages: [{ type: String}],
    createdAt: { type: Date, default: Date.now },
});

const Jewellery = mongoose.model("Jewellery", jewellerySchema);
module.exports= Jewellery;
