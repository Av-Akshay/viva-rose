const { BadRequestError } = require("../errors/errors");
const Cart = require("../models/cart.model.js");

// Get cart by userId
const getCartByUserId = async (userId) => {

        const cart = await Cart.findOne({ userId }).populate("items.productId");
        if (!cart){
            throw new BadRequestError("Cart not found");
        }
        return cart;
};

// Add item to cart
const addItemToCart = async (userId, itemData) => {

        const productId= itemData.productId;
        const quantity=itemData.quantity;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart();
            cart.userId=userId;
            cart.items= [{ productId, quantity }];
        } else {
            const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }
        await cart.save();    
};

// Update item quantity in cart
const updateCartItem = async (userId, itemData) => {
        const {productId, quantity } = itemData;

        const cart = await Cart.findOne({ userId });
        if (!cart){
            throw new BadRequestError("Cart not found");
        }
        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
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
const removeCartItem = async (userId, productId) => {
        const cart = await Cart.findOne({ userId });
        if (!cart){
            throw new BadRequestError("Cart not found");
        }

        cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

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
