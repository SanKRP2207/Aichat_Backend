import mongoose, { model } from "mongoose";
import { randomUUID } from "crypto";
const chatShema = new mongoose.Schema({
    id: {
        type: String,
    default: randomUUID(),
    },
    role: {
        type: String,
        required: true,
    }, 
    content: {
        type: String,
        required: true,
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        sparse: true,
    },
    password: {
        type: String,
        required: true,
    },
    chats:[chatShema],
});

export default mongoose.model("User", userSchema );