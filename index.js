import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import LocalStrategy from 'passport-local'
import jwt from 'jsonwebtoken'
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(bodyParser.json());
app.use(passport.initialize())
app.use(methodOverride('_method'));

// Connect to MongoDB
mongoose.connect(process.env.DB).then(()=>console.log("connected")).catch((e)=>console.log(e))

import './config/passport.js';

// Routes

// import storyRoutes from './routes/storyRoutes';
app.use('/users', userRoutes);
// app.use('/stories', storyRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
