import express from 'express';
import { addProduct, deleteProduct, getproduct, getProductById, getProductByUserId} from '../controllers/product.js';

const productRoute = express.Router();

productRoute.post("/createproduct" , addProduct);
productRoute.get("/getproduct", getproduct);
productRoute.get("/getproduct/:id", getProductById);
productRoute.delete("/deleteproduct/:id" , deleteProduct)
productRoute.get("/productbyuser/:id" , getProductByUserId);

export default productRoute