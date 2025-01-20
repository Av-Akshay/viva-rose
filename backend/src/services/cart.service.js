const { BadRequestError } = require("../errors/errors");
const Cart = require("../models/cart.model.js");
const User= require("../models/user.model.js");

// Get cart by userId
const getCartByUserId = async (userId) => {
    const cart = await Cart.findOne({ userId }).populate("items.jewelleryId");
    if (cart.items.length===0) {
        throw new BadRequestError("Cart is empty");
    }
    return cart;
};

// Add item to cart
const addItemToCart = async (userId, { jewelleryId, quantity }) => {
    if (!jewelleryId || !quantity || quantity <= 0) {
        throw new BadRequestError("Invalid item data");
    }
    let user = await User.findById(userId);
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({ userId, items: [{ jewelleryId, quantity }] });
        user.cart=cart._id;
        await user.save();
    } else {
        const itemIndex = cart.items.findIndex(
            (item) => item.jewelleryId.toString() === jewelleryId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ jewelleryId, quantity });
        }
    }
    await cart.save();
    return cart;
};

// Update item quantity in cart
const updateCartItem = async (userId, { jewelleryId, quantity }) => {
    if (!jewelleryId || quantity === undefined || quantity < 0) {
        throw new BadRequestError("Invalid item data");
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new BadRequestError("Cart not found");
    }

    const itemIndex = cart.items.findIndex(
        (item) => item.jewelleryId.toString() === jewelleryId
    );
    if (itemIndex > -1) {
        if (quantity === 0) {
            cart.items.splice(itemIndex, 1); // Remove item if quantity is 0
        } else {
            cart.items[itemIndex].quantity = quantity;
        }
    } else {
        throw new BadRequestError("Item not found in cart");
    }

    await cart.save();
    return cart;
};

// Remove item from cart
const removeCartItem = async (userId, jewelleryId) => {
    if (!jewelleryId) {
        throw new BadRequestError("Jewellery not found");
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new BadRequestError("Cart not found");
    }

    const initialItemCount = cart.items.length;
    cart.items = cart.items.filter(
        (item) => item.jewelleryId.toString() !== jewelleryId
    );

    if (cart.items.length === initialItemCount) {
        throw new BadRequestError("Item not found in cart");
    }

    await cart.save();
    return cart;
};

// Clear cart
const clearCart = async (userId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new BadRequestError("Cart not found");
    }

    cart.items = [];
    await cart.save();
    return { message: "Cart cleared successfully" };
};

module.exports = {
    getCartByUserId,
    addItemToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
};
