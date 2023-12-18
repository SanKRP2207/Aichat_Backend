import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constant.js";

const key = process.env.JWT_SECRET || "defaut key";
export const createtoken = (id: string, email: string, expiresIn: string | number) => {
    const payload = { id, email };
    const token = jwt.sign(payload, key, {
        expiresIn,
    });
    return token;
};

export const verfyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const token = req.signedCookies[`${COOKIE_NAME}`];
    if(!token || token.trim() === ""){
        return res.status(401).json({message: "token not received"})
    }
    return new Promise<void>((resolve, reject) => {
        return jwt.verify(token, key, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: "Token Expired" })
            }else{
                console.log("Token verification successful");
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        })

    })


} 