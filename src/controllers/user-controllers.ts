import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
// import createtoken from "../utils/tokan-manager.js";
// import COOKIE_NAME from "../utils/constant.js";

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // get all user
        const users = await User.find();
        return res.status(200).json({ message: "Ok", users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "ERROR", error: (error as Error).message });

    }

};


import { compare, hash } from "bcrypt";
import { COOKIE_NAME } from "../utils/constant.js";
import { createtoken } from "../utils/token-manager.js";

export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // user signup
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(401).send("User already registered");
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // creating token and cookies

        res.clearCookie(COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/",
        });

        const token = createtoken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth_token", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });


        return res.status(201).json({ message: "Ok", name: user.name, email: user.email });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "ERROR", error: (error as Error).message });

    }

};

export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // user login
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not registered");
        }
        const isPasswordCurrect = await compare(password, user.password);
        if (!isPasswordCurrect) {
            return res.status(403).send("Incorrect Password");
        }


        // creating token and cookies
        res.clearCookie(COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/",
        });

        const token = createtoken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth_token", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });



        return res.status(200).json({ message: "Ok", name: user.name, email: user.email });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "ERROR", error: (error as Error).message });

    }

};
