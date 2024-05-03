import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import Story from './models/story';
import denv from 'dotenv'

denv.config()
mongoose.connect(process.env.DB)
mongoose.connection.once('open', () => console.log("Connected to MongoDB"));


const app = express()