const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String},
  password: {
        type: String,
        required: true,
        minlength: 6,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address"
  },
  address1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address"
  },
  address2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address"
  },
  address3: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address"
  },
  isVerified: { type: Boolean, default: false},
  role: {type: String, enum: ["User","Agent","Admin"], default: 'User'},
  phone: { type: String, minlength: 12, maxlength: 12},
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }],
  orders: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Order" 
  }],
  profilePic: { type: String},
  reviewRating: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Order" 
  }],
},{timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;