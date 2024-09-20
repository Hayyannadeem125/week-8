import mongoose from "mongoose";
import user from "./user-model.js";

const productSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true,       
    },
    description : {
        type : String,
        required : true,
        unique : true,
    },
    quantity : {
        type : Number,
        required : true,

    },
    price : {
        type : Number,
        required : true,
    },
    category : {
        type : String,
    },
    image : {
        type : String,
    },
    user : {
        ref : user,
        type : mongoose.Schema.Types.ObjectId,

    }

}, {
    timestamps : true,
})

let product = mongoose.model("product", productSchema);
export default product