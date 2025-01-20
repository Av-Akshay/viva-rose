const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    deliveryDate: {type: Date},
    items: [
        {
            jewelleryId: { type: mongoose.Schema.Types.ObjectId, ref: "Jewellery"},
            quantity: { type: Number},
        },
    ],
    totalAmount: { type: Number, required: true },
    paymentId: { type: String },
    paymentStatus: { type: String, default: "Pending" }, // Pending, Paid, Failed
    status: { type: String, default: "Pending", enum: ["Pending", "Completed", "Cancelled", "Refund"] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

orderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports= Order;
