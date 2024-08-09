import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    items: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    amount: { type: Number, required: true },
    address: { type: addressSchema, required: true },
    status: { type: String, default: 'processing' }, // Add the status field
    payment: { type: Boolean, default: false }, // If you need to track payment status
    date: { type: Date, default: Date.now }
});

const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;
