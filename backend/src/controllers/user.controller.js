const userService = require("../services/user.service.js");
const logger = require("../configs/winston.config.js");

// Create a new user
const createUser = async (req, res, next) => {
  try {
    const { response, user } = await userService.createUser(req.body);
    logger.info(
      "User id:" + `${user._id}` + " has been registered successfully"
    );
    res.status(201).json({
      success: true,
      data: { response },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Update user by ID
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(req.user.id, req.body);
    logger.info(
      "User id:" + `${updatedUser._id}` + " has updated his data successfully"
    );
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    //console.log(error);
    next(error);
  }
};

// Delete user by ID
const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.user.id);
    logger.info(
      "User id:" + `${req.user.id}` + " has been deleted successfully"
    );
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const updatedUser = await userService.changePassword(
      req.user.id,
      req.body
    );
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const response = await userService.resetPassword(
      req.user.id,
      req.body.newPassword,
      req.body.confirmNewPassword
    );
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const orders = async (req, res, next) => {
  try {
    const userId= req.user.id;
    const orders = await userService.orders(userId);
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

const wishlistJewellery = async (req, res, next) => {
  try {
    const wishlist = await userService.wishlistJewellery(req.user.id);
    res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

// Add a property to favorites
const addWishlistJewellery = async (req, res, next) => {
    try {
      const wishlistJewellery = await userService.addWishlistJewellery(
        req.user.id,
        req.body.jewelleryId
      );
      res.status(200).json({
        success: true,
        data: wishlistJewellery,
      });
    } catch (error) {
      //console.log(error);
      next(error);
    }
  };
  
  // Remove a property from favorites
  const removeWishlistJewellery = async (req, res, next) => {
    try {
      const wishlistJewellery = await userService.removeWishlistJewellery(
        req.user.id,
        req.body.jewelleryId
      );
      res.status(200).json({
        success: true,
        data: wishlistJewellery,
      });
    } catch (error) {
      //console.log(error);
      next(error);
    }
  };

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addWishlistJewellery,
  removeWishlistJewellery,
  changePassword,
  resetPassword,
  orders,
  wishlistJewellery
};
