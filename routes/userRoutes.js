import express from 'express';
const router = express.Router();

// Import controller
import UserController from '../controllers/userController.js';

// Routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);

export default router;
