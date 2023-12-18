import express from 'express';
import morgan from "morgan";
import dotenv from 'dotenv';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
// import { cookieParser } from "cookie-parser";
import cors from 'cors';
//For env File 
dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
//Morgan is another HTTP request logger middleware for Node. js.
// It simplifies the process of logging requests to your application.
// this will we remove once implementation is done 
// we not using in production
app.use(morgan("dev"));
app.use("/api/v1", appRouter); // router we use
export default app;
