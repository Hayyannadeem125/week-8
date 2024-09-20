import express from  'express';
import { getPaymentByOrderId, processPayment } from '../controllers/payment.js';

const paymentRoute =  express.Router();

paymentRoute.post("/" , processPayment);
paymentRoute.get("/:id" , getPaymentByOrderId);

export default paymentRoute;

