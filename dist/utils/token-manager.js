import jwt from "jsonwebtoken";
const key = process.env.JWT_SECRET || "defaut key";
export const createtoken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, key, {
        expiresIn,
    });
    return token;
};
