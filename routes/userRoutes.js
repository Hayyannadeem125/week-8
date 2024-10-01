import express from 'express';
import { deleteUser, getUserById, getUsersData, loginUser, logoutUser, postUserData, registerUser, updateUser } from '../controllers/user.js';
import upload from '../config/utils/helper.js';
import { Middleware, roleBasedMiddleware } from '../middleware/Middleware.js';

const userRoute = express.Router();

userRoute.post("/createuser" , upload.single('image'), postUserData );
userRoute.get("/get", getUsersData);
userRoute.get("/get/:id", getUserById);
userRoute.delete("/delete/:id" , deleteUser)
userRoute.put("/update/:id" ,  updateUser);
userRoute.post("/regUser", registerUser);
userRoute.post("/loginUser", loginUser);
userRoute.post(
  "/logoutUser",
  Middleware,
  roleBasedMiddleware("admin", "superAdmin"),
  logoutUser
);



export default userRoute