import passport from 'passport';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserController = {
    googleLogin: passport.authenticate('google', { scope: ['profile', 'email'] }),

    googleCallback: passport.authenticate('google', { failureRedirect: '/login' }),

    // Optional: If you want to handle the callback manually
    // googleCallback: (req, res, next) => {
    //     passport.authenticate('google', (err, user) => {
    //         if (err) { return next(err); }
    //         if (!user) { return res.redirect('/login'); }
    //         req.logIn(user, (err) => {
    //             if (err) { return next(err); }
    //             return res.redirect('/'); // Redirect to home page after successful authentication
    //         });
    //     })(req, res, next);
    // }
};


// Register a new user
export const Register = async (req, res) => {
    try {
        const { email, password,name,image } = req.body;
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = await User.create({
            email,
            password: hashedPassword,
            name,
            image
        });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Login user
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({success:true, token:token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const GetUser = async (req, res) => {
    try {
        // Extract the JWT token from the request headers
        const token = req.headers.authorization.split(' ')[1];

        // Verify the JWT token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            // Extract the user ID from the decoded token
            const userId = decodedToken.userId;

            // Retrieve the user from the database based on the user ID
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Return the user information as a response
            res.status(200).json({ user });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default UserController;
