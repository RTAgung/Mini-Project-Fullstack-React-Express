import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserService from "../services/user.service.js";
import { env } from "process";
import { getTokenData } from "../helper/token.helper.js";

class AuthController {
    async login(req: Request, res: Response): Promise<any> {
        try {
            const { email, password } = req.body;
            const user = await UserService.login(email, password);

            if (!user) {
                return res.status(401).json({
                    status: "error",
                    message: "Invalid email or password",
                });
            }

            const encodedString = Buffer.from(
                JSON.stringify({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                })
            ).toString("base64");

            const token = jwt.sign(
                { ___: encodedString },
                env.JWT_SECRET_KEY ?? "",
                { expiresIn: "1M" }
            );

            res.cookie("session", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
                sameSite: "strict",
            });

            res.status(200).json({
                status: "success",
                message: "Login successful",
                data: { token },
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async decode(req: Request, res: Response): Promise<any> {
        try {
            const tokenData = getTokenData(req.body.token);

            res.status(200).json({
                status: "success",
                message: "Token decoded successfully",
                data: tokenData,
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async register(req: Request, res: Response): Promise<any> {
        try {
            const response = await UserService.create({ ...req.body });

            res.status(201).json({
                status: "success",
                message: "User registered successfully",
                data: response,
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
}

export default new AuthController();
