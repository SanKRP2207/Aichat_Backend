import jwt from "jsonwebtoken";

const key = process.env.JWT_SECRET || "defaut key";
export const createtoken = (id: string, email: string, expiresIn: string | number) => {
    const payload = { id, email };
    const token = jwt.sign(payload, key, {
        expiresIn,
    });
    return token;
}; 