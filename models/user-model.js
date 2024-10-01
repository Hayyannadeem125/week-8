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
    password: {
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
    // address: {
    //     street: String,
    //     city: String,
    //     state: String,
    //     zipCode: String,
    //     country: String,
    // },
    // image:{
    // type: String,
    // },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    },
});

let user = mongoose.model("user", userSchema);
export default user;
