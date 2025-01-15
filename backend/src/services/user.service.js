const User = require("../models/user.model.js");
const Jewellery= require("../models/jewellery.model.js");
const {
  ConflictError,
  NotFoundError,
  BadRequestError,
} = require("../errors/errors.js");
const { sendOTP, verifyOTP } = require("../utils/email.util.js");
const JWTToken = require("../utils/token.generation.util.js");
const hashValue = require("../utils/hashing.util.js");
const logger = require("../configs/winston.config.js");
const dotenv = require("dotenv");

dotenv.config();

// Create a new user
const createUser = async (userData) => {
  const email = userData.email;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ConflictError("User with this email already exists");
  }

  const password = hashValue.hash(userData.password);

  const user = new User();
  user.name = userData.name;
  user.email = email;
  user.role = "User";
  user.password = password;
  user.phone= userData.phone;
  user.isVerified = false;

  await user.save();
  //const response = await sendOTP(user.email);
  const response=JWTToken.generateToken(user);

  return { response, user }; // Return both user and token
};

const getAllUsers = async () => {
  const users = await User.find()
    //.populate("Order")
    .exec();

  logger.error("error");
  return users;
};

const getUserById = async (userId) => {
  const user = await User.findById(userId)
    //.populate("Order")
    .exec();
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
};

// Update user's name only
const updateUser = async (userId, updateData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const email = updateData.email;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ConflictError("User with this email already exists");
  }

  const password = hashValue.hash(updateData.password);
  user.email = email;

  //user.phone = phone;
  user.password = password;

  await user.save();

  return user;
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
};

const changePassword = async (userId, passwordData) => {
  // Fetch the user by userId
  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  // Hash the provided old password and compare it with the stored hashed password
  const hashedOldPassword = hash(passwordData.oldPassword);
  if (hashedOldPassword !== user.password) {
    throw new BadRequestError("Old password is incorrect");
  }

  // Check if newPassword and confirmNewPassword are the same
  if (passwordData.newPassword !== user.password) {
    throw new BadRequestError("New password should not match old password");
  }

  // Check if newPassword and confirmNewPassword are the same
  if (passwordData.newPassword !== passwordData.confirmNewPassword) {
    throw new BadRequestError("New passwords do not match");
  }

  // Hash the new password before saving it
  user.password = hash(passwordData.newPassword);

  // Save the updated user
  return await user.save();
};

const resetPassword = async (userId, newPassword, confirmNewPassword) => {
  // Fetch the user by userId
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  if (newPassword == confirmNewPassword) {
    user.password = hashValue.hash(newPassword);
    await user.save();
  } else {
    throw new ConflictError(
      "New password and confirm new password should be same"
    );
  }

  const response = "Password has been reset successfully";
  return response;
};

const orders = async (userId) => {
    const User = await User.findById(userId)
    .populate("Order")
    .exec();

    if(User.orders.length=='0'){
        throw new NotFoundError("No orders found");
    }
  
  return User.orders;
};

const wishlistJewellery = async(userId) =>{
    const user = await User.findById(userId).populate("wishlist").exec();

    if(user.wishlist.length=='0'){
        throw new NotFoundError("No jewellerys found");
    }
    return user.wishlist;
}

// Add a property to favorites
const addWishlistJewellery = async (userId, jewelleryId) => {
    const wishlistJewellery = await Jewellery.findById(jewelleryId);
    if (!wishlistJewellery) {
      throw new NotFoundError('Jewellery not found');
    }
  
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
  
    // Check if the Jewellery already exists in favorites
    if (user.wishlist.includes(jewelleryId)) {
      return { message: 'Jewellery already in wishlist' };
    }
  
    user.wishlist.push(jewelleryId);
    await user.save();
    
    return wishlistJewellery;
  };
  
  // Remove a Jewellery from favorites
  const removeWishlistJewellery = async (userId, jewelleryId) => {
    const wishlistJewellery = await Jewellery.findById(jewelleryId);
    if (!wishlistJewellery) {
      throw new NotFoundError('Jewellery not found');
    }
  
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
  
    // Check if the Jewellery is not in favorites
    if (!user.wishlist.includes(jewelleryId)) {
      return { message: 'Jewellery not in wishlist' };
    }
  
    // Filter out the Jewellery from favoriteProperties
    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== jewelleryId.toString()
    );
    await user.save();
  
    return wishlistJewellery;
  };


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changePassword,
  resetPassword,
  orders,
  wishlistJewellery,
  addWishlistJewellery,
  removeWishlistJewellery
};
