import { Request, Response } from "express";
import AbstractCRUDModel from "../abstracts/model.abstract.js";
import UserService from "../services/user.service.js";

class UserController extends AbstractCRUDModel {
    async getAll(req: Request, res: Response): Promise<any> {
        try {
            const response = await UserService.getAll();
            res.status(200).json({
                status: "success",
                message: "Users fetched successfully",
                data: response,
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async getById(req: Request, res: Response): Promise<any> {
        try {
            const response = await UserService.getById(req.params.id);
            res.status(200).json({
                status: "success",
                message: "User fetched successfully",
                data: response,
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async create(req: Request, res: Response): Promise<any> {
        try {
            const response = await UserService.create({ ...req.body });
            res.status(201).json({
                status: "success",
                message: "User created successfully",
                data: response,
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async update(req: Request, res: Response): Promise<any> {
        try {
            const response = await UserService.update(req.params.id, {
                ...req.body,
            });
            res.status(200).json({
                status: "success",
                message: "User updated successfully",
                data: response,
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async delete(req: Request, res: Response): Promise<any> {
        try {
            const response = await UserService.delete(req.params.id);
            res.status(200).json({
                status: "success",
                message: "User deleted successfully",
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

export default new UserController();
