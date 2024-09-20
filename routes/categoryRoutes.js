import express from  'express';
import { addCategory, getAllCategories } from '../controllers/category.js';

const categoryRoute = express.Router();

categoryRoute.post( "/" , addCategory);
categoryRoute.get("/getcategory" , getAllCategories);

export default  categoryRoute;