import express from 'express';
const router = express.Router();
import passport from 'passport';
// Import controller
import UserController from '../controllers/userController.js';
import {Login,Register,GetUser} from '../controllers/userController.js'

// // Routes
// router.get('/', UserController.googleLogin);
// router.get('/callback', UserController.googleCallback);
router.post('/login', Login);
router.post('/register', Register)
router.get('/user', GetUser);

export default router;
