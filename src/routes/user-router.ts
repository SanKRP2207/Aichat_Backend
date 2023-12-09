import {Router} from "express";
import { getAllUsers, userSignup, userLogin } from "../controllers/user-controllers.js";
import { validate,loginValidators, signupValidators  } from "../utils/validators.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signupValidators) ,userSignup);
userRouter.post("/login", validate(loginValidators) ,userLogin);


export default userRouter;