import express from  'express';
import { createOrder, getOrderById, getUserOrders } from '../controllers/order.js';

const orderRoute =  express.Router();

orderRoute.post("/create" , createOrder);
orderRoute.get("/userorder" , getUserOrders);
orderRoute.get("orderbyid/:id" , getOrderById);

export  default orderRoute;
