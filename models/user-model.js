import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    firstName: {
        type: String
    },
    lastName: { 
        type: String
    },
    phone: {
        type: String
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    },
    createdAt: { type: Date,
        default: Date.now
    },
});

let user = mongoose.model("user", userSchema);
export default user;
