import express from 'express';
import cors from 'cors';
const bcrypt = require('bcryptjs');

import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRouter.js';
import cartRouter from './routes/cartRouter.js';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js'; // Add this line
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173' // Replace with your frontend URL if different
}));

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to log request body
app.use((req, res, next) => {
    console.log('Incoming request body:', req.body);
    next();
});

// Connect to the database
connectDB();

// Serve static files from the "uploads" directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the routers
app.use('/api/foods', foodRouter);
app.use('/images', express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter); // This should work now

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad JSON:', err);
        return res.status(400).send({ message: 'Invalid JSON payload' });
    }
    next();
});

// Define the port
const PORT = process.env.PORT || 4000;

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please choose a different port.`);
        process.exit(1);
    } else {
        throw error;
    }
});
