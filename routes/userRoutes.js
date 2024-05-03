import express from 'express';
const router = express.Router();

// Import controller
import UserController from '../controllers/userController.js';

// Routes
router.get('/', UserController.googleLogin);
router.get('/callback', UserController.googleCallback);

export default router;
