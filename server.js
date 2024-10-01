// import fs from 'fs';
// import http from "http";

// const httpServer = http.createServer((req, res) => {

//     const log = `${Date.now()} : New request received \n`;

//     fs.appendFile("./index.txt" , log , (err , data) => {
//         res.end("Hello from server");
//     })
// })

// httpServer.listen(5000 , () => {
//     console.log("server started");
// })


import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";    
import { connectDB } from "./config/db.js";
import productRoute from "./routes/productRoutes.js";
import userRoute from "./routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import cartRoute from "./routes/cartRoutes.js";
import categoryRoute from "./routes/categoryRoutes.js";
import orderRoute from "./routes/orderRoute.js";
import paymentRoute from "./routes/paymentRoute.js";




dotenv.config();

const app = express();
app.use(cors())

app.use(express.json());
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(bodyParser.urlencoded({ extended : true}))
app.use(bodyParser.json());
app.use("/" , productRoute);
app.use("/",userRoute);
app.use("/",cartRoute);
app.use("/", categoryRoute);
app.use("/", orderRoute);
app.use("/",paymentRoute);


const port = process.env.PORT || 5000
connectDB()
app.listen( port , () => {
    console.log("Express server started");
})

