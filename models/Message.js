import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const messageSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    sender: {
        type: String, // UUID of the sender
        required: true
    },
    receiver: {
        type: String, // UUID of the receiver
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;
