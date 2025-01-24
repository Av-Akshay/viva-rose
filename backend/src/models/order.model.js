const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderCode: { type: Number, required: true },
    addressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
    deliveryDate: {type: Date},
    returnWindowDate: {type: Date},
    items: [
        {
            jewelleryId: { type: mongoose.Schema.Types.ObjectId, ref: "Jewellery"},
            quantity: { type: Number},
        },
    ],
    totalAmount: { type: Number, required: true },
    paymentId: { type: String },
    paymentStatus: { type: String, default: "Pending" }, // Pending, Paid, Failed
    orderStatus: { type: String, default: "In progress", enum: ["In progress", "Completed", "Cancelled", "Returned", "Replaced"] },
    shippingStatus: {type: String, default: "Order Processing", enum: ["Order Processing", "Order Packed", "Order Shipped", "Out of Delivery", "Order Delivered", "Returned to Sender", "Out for receiving "]},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

orderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports= Order;
