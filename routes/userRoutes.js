import express from 'express';
import { deleteUser, getUserById, getUsersData, loginUser, postUserData, registerUser, updateUser } from '../controllers/user.js';

const userRoute = express.Router();

userRoute.post("/createuser" , postUserData );
userRoute.get("/get", getUsersData);
userRoute.get("/get/:id", getUserById);
userRoute.delete("/delete/:id" , deleteUser)
userRoute.post("/update/:id" ,  updateUser);
userRoute.post("/registerUser" , registerUser);
userRoute.post("/login" , loginUser);



export default userRoute