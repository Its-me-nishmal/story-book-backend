import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    friends: [{
        type: String, // If using UUIDs for _id, store friends' UUIDs directly
        ref: 'User'
    }],
    friendRequests: [{
        type: String, // If using UUIDs for _id, store friend requesters' UUIDs directly
        ref: 'User'
    }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
