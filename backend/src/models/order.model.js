const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
    deliveryDate: {type: Date},
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    paymentId: { type: String },
    paymentStatus: { type: String, default: "Pending" }, // Pending, Paid, Failed
    status: { type: String, default: "Pending", enum: ["Pending", "Completed", "Cancelled"] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

orderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Order", orderSchema);
