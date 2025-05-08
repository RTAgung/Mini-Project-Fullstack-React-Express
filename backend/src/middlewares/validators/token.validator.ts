import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const tokenValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
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

        next();
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            res.status(401).json({
                status: "error",
                message: "Token has expired",
            });
            return;
        }

        if (error.name === "JsonWebTokenError") {
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
