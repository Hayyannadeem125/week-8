import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cart.js';

let cartRoute = express.Router();

cartRoute.get("/getcart" , getCart);
cartRoute.post("/addtocart" , addToCart);
cartRoute.post("/remove" , removeFromCart);

export default cartRoute