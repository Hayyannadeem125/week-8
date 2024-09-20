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



dotenv.config();

const app = express();

app.use(cors())

app.use(express.json())

app.use(bodyParser.urlencoded({ extended : true}))
app.use(bodyParser.json());
app.use("/" , productRoute);
const port = process.env.PORT || 5000
connectDB()
app.listen( port , () => {
    console.log("Express server started");
})

