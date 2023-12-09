import { Router } from "express";
import userRouters from "./user-router.js";
import chatRouters from "./chat-router.js";

const appRouter = Router();

appRouter.use("/user", userRouters);//domain/api/v1/user
appRouter.use("/user", chatRouters);//domain/a[i/v1/chat

export default appRouter;