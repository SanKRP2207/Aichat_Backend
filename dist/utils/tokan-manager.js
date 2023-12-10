import jwt from "jsonwebtoken";
console.log("this is checking", process.env.JWT_SECRET);
export const createtoken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.COOKIE_SECRET, {
        expiresIn,
    });
    return token;
};
