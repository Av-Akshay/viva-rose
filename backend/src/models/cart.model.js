const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    items: [
        {
            jewelleryId: { type: mongoose.Schema.Types.ObjectId, ref: "Jewellery", required: true },
            quantity: { type: Number, default: 1 },
        },
    ],
},{timestamps: true});

const Cart = mongoose.model("Cart", cartSchema);
module.exports= Cart;
