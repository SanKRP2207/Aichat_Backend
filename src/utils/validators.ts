import { NextFunction, Request, Response } from "express";
import { body, ValidationChain,validationResult } from "express-validator";


const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for(let validation of validations){
            const result = await validation.run(req);
            if(!result.isEmpty()){
                break;
            }
        }
        const error =validationResult(req);
        if(error.isEmpty()){
            return next();
        }
        return res.status(422).json({error: error.array()})
    }

}

const loginValidators = [

    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").notEmpty().isLength({min:6}).withMessage("Password should containt atleast 6 charecter"),

];

const signupValidators = [

    body("name").notEmpty().withMessage("name is required"),
    ...loginValidators,
];

export {validate, signupValidators, loginValidators};