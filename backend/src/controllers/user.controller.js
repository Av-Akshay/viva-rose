const userService = require("../services/user.service.js");
const auth = require("../middlewares/auth.js");
const logger = require("../configs/winston.config.js");
const propertyService = require("../services/property.service.js");

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
    const user = await userService.getUserById(req.params.id);
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
    await userService.deleteUser(req.params.id);
    logger.info(
      "User id:" + `${req.params.id}` + " has been deleted successfully"
    );
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Add a property to favorites
const addFavoriteProperty = async (req, res, next) => {
  try {
    const property = await propertyService.addFavoriteProperty(
      req.user.id,
      req.body.propertyId
    );
    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    //console.log(error);
    next(error);
  }
};

// Remove a property from favorites
const removeFavoriteProperty = async (req, res, next) => {
  try {
    const property = await propertyService.removeFavoriteProperty(
      req.user.id,
      req.body.propertyId
    );
    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    //console.log(error);
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const updatedUser = await userService.changePassword(
      req.params.id,
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
const wishlistProduct = async (req, res, next) => {
  try {
    const wishlist = await userService.wishlistProduct(userId);
    res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

// Add a property to favorites
const addWishlistProduct = async (req, res, next) => {
    try {
      const wishlistProduct = await productService.addWishlistProduct(
        req.user.id,
        req.body.productId
      );
      res.status(200).json({
        success: true,
        data: wishlistProduct,
      });
    } catch (error) {
      //console.log(error);
      next(error);
    }
  };
  
  // Remove a property from favorites
  const removeWishlistProduct = async (req, res, next) => {
    try {
      const wishlistProduct = await productService.removeWishlistProduct(
        req.user.id,
        req.body.productId
      );
      res.status(200).json({
        success: true,
        data: wishlistProduct,
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
  addWishlistProduct,
  removeWishlistProduct,
  changePassword,
  resetPassword,
  orders,
  wishlistProduct
};
