import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const loginValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required().messages({
                "string.empty": "Email is required",
                "string.email": "Email must be a valid email address",
            }),
            password: Joi.required().messages({
                "string.empty": "Password is required",
            }),
        });
        const validateError = schema.validate(req.body).error;
        if (validateError) {
            res.status(400).json({
                status: "error",
                message: validateError.message,
            });
            return;
        }
        next();
    } catch (error: any) {
        console.error(error);
    }
};

export const registerValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const schema = Joi.object({
            fullname: Joi.string().max(50).required().messages({
                "string.empty": "Fullname is required",
                "string.max": "Fullname must not exceed 50 characters",
            }),

            username: Joi.string()
                .min(6)
                .pattern(/^\S+$/) // no spaces allowed
                .required()
                .messages({
                    "string.empty": "Username is required",
                    "string.min": "Username must be at least 6 characters",
                    "string.pattern.base": "Username cannot contain spaces",
                }),

            email: Joi.string().email().required().messages({
                "string.empty": "Email is required",
                "string.email": "Email must be a valid email address",
            }),

            phoneNumber: Joi.string()
                .pattern(/^(\+628|08)[0-9]{8,11}$/)
                .min(10)
                .max(13)
                .required()
                .messages({
                    "string.empty": "Phone number is required",
                    "string.pattern.base":
                        "Phone number must start with +628 or 08 and contain 10–13 digits",
                    "string.min": "Phone number must be at least 10 digits",
                    "string.max": "Phone number must not exceed 13 digits",
                }),

            password: Joi.string()
                .min(8)
                .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
                .required()
                .messages({
                    "string.empty": "Password is required",
                    "string.min": "Password must be at least 8 characters",
                    "string.pattern.base":
                        "Password must contain uppercase, lowercase letters, and a number",
                }),

            confirmPassword: Joi.any()
                .equal(Joi.ref("password"))
                .required()
                .messages({
                    "any.only": "Confirm password must match password",
                    "any.required": "Confirm password is required",
                }),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({
                status: "error",
                message: error.message,
            });
            return;
        }

        next();
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Server error during validation",
        });
    }
};
