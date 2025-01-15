const { BadRequestError } = require("../errors/errors");
const Cart = require("../models/cart.model.js");

// Get cart by userId
const getCartByUserId = async (userId) => {

        const cart = await Cart.findOne({ userId }).populate("items.jewelleryId");
        if (!cart){
            throw new BadRequestError("Cart not found");
        }
        return cart;
};

// Add item to cart
const addItemToCart = async (userId, itemData) => {

        const jewelleryId= itemData.jewelleryId;
        const quantity=itemData.quantity;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart();
            cart.userId=userId;
            cart.items= [{ jewelleryId, quantity }];
        } else {
            const itemIndex = cart.items.findIndex((item) => item.jewelleryId.toString() === jewelleryId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ jewelleryId, quantity });
            }
        }
        await cart.save();    
};

// Update item quantity in cart
const updateCartItem = async (userId, itemData) => {
        const {jewelleryId, quantity } = itemData;

        const cart = await Cart.findOne({ userId });
        if (!cart){
            throw new BadRequestError("Cart not found");
        }
        const itemIndex = cart.items.findIndex((item) => item.jewelleryId.toString() === jewelleryId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            if (quantity === 0) cart.items.splice(itemIndex, 1); // Remove item if quantity is 0
        } else {
            throw new BadRequestError("Item not found in cart");
        }

        await cart.save();
        return cart;
};

// Remove item from cart
const removeCartItem = async (userId, jewelleryId) => {
        const cart = await Cart.findOne({ userId });
        if (!cart){
            throw new BadRequestError("Cart not found");
        }

        cart.items = cart.items.filter((item) => item.jewelleryId.toString() !== jewelleryId);

        await cart.save();
        return cart;
};

// Clear cart
const clearCart = async (userId) => {
        const cart = await Cart.findOne({ userId });
        if (!cart){
            throw new BadRequestError("Cart not found");
        }
        cart.items = [];
        await cart.save();
        const response = "Cart cleared successfully";
        return response;
};

module.exports= {getCartByUserId, addItemToCart , updateCartItem, removeCartItem, clearCart}
