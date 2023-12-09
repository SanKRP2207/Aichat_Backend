import express, { Express, Request, Response , Application } from 'express';

import morgan from "morgan";
import dotenv from 'dotenv';
import appRouter from './routes/index.js';

//For env File 
dotenv.config();

const app: Application = express();
app.use(express.json());

//Morgan is another HTTP request logger middleware for Node. js.
// It simplifies the process of logging requests to your application.
// this will we remove once implementation is done 
// we not using in production
app.use(morgan("dev")); 

app.use("/api/v1", appRouter); // router we use

export default app;
