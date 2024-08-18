import dotenv from 'dotenv';
dotenv.config();

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "https://fooddelapp-front-end.onrender.com";
    try {
        const { userId, items, amount, address } = req.body;
        if (!userId || !items || !amount || !address) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Create and save a new order
        const newOrder = new orderModel({ userId, items, amount, address });
        await newOrder.save();

        // Clear the user's cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Prepare line items for Stripe
        const line_items = items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.price * 100)
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery charges"
                },
                unit_amount: Math.round(2 * 100)
            },
            quantity: 1
        });

        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error('Order placement error:', error);
        res.status(500).json({ success: false, message: 'Error processing order' });
    }
};

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success) {
            // Mark the order as paid
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment successful" });
        } else {
            // Delete the order if payment failed
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed" });
        }
    } catch (error) {
        console.error('Error verifying order:', error);
        res.status(500).json({ success: false, message: 'Error verifying order' });
    }
};

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        const orders = await orderModel.find({ userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Error fetching orders' });
    }
};

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error('Error listing orders:', error);
        res.status(500).json({ success: false, message: 'Error listing orders' });
    }
};
//api for updating order status
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        await orderModel.findByIdAndUpdate(orderId, { status: status });
        res.json({ success: true, message: "Status updated" });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ success: false, message: "Error updating status" });
    }
};


export { placeOrder, verifyOrder, userOrders, listOrders,updateStatus };
