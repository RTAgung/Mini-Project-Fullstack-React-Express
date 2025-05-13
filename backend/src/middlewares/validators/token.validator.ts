import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getTokenData } from "../../helper/token.helper.js";

export const tokenValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({
                status: "error",
                message: "No token provided",
            });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY ?? "");
        if (!decoded) {
            res.status(401).json({
                status: "error",
                message: "Invalid token",
            });
            return;
        }

        res.cookie("token", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });
        req.user = getTokenData(token);
        next();
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
            });
            res.status(401).json({
                status: "error",
                message: "Token has expired",
            });
            return;
        }

        if (error.name === "JsonWebTokenError") {
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
            });
            res.status(401).json({
                status: "error",
                message: "Invalid token",
            });
            return;
        }

        // Catch-all for unexpected errors
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};
