import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    try {
        console.log("Incoming request body:", req.body);

        if (!req.body.userId) {
            throw new Error("userId is required");
        }

        const userData = await userModel.findById(req.body.userId);

        if (!userData) {
            console.error(`User not found for ID: ${req.body.userId}`);
            throw new Error("User not found");
        }

        const cartData = userData.cartData || {};

        cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error("Error in addToCart:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);

        if (!userData) {
            console.error(`User not found for ID: ${req.body.userId}`);
            throw new Error("User not found");
        }

        const cartData = userData.cartData || {};

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }

            await userModel.findByIdAndUpdate(req.body.userId, { cartData });
            res.json({ success: true, message: "Removed from cart" });
        } else {
            res.status(400).json({ success: false, message: "Item not in cart" });
        }
    } catch (error) {
        console.error("Error in removeFromCart:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);

        if (!userData) {
            console.error(`User not found for ID: ${req.body.userId}`);
            throw new Error("User not found");
        }

        const cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.error("Error in getCart:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addToCart, removeFromCart, getCart };
