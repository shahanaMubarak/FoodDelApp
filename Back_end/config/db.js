import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://stack:786@cluster0.psdrw3h.mongodb.net/FoodDelApp');
        console.log('DB connected');
    } catch (error) {
        console.error('DB connection failed:', error);
    }
};
