import { Request, Response } from "express";
import AbstractCRUDModel from "../abstracts/model.abstract.js";
import SymbolService from "../services/symbol.service.js";

class SymbolController extends AbstractCRUDModel {
    async getAll(req: Request, res: Response): Promise<any> {
        try {
            const response = await SymbolService.getAll();
            res.status(200).json({
                status: "success",
                message: "Symbols fetched successfully",
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
            const response = await SymbolService.getById(req.params.id);
            res.status(200).json({
                status: "success",
                message: "Symbol fetched successfully",
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
            const response = await SymbolService.create({ ...req.body });
            res.status(201).json({
                status: "success",
                message: "Symbol created successfully",
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
            const response = await SymbolService.update(req.params.id, {
                ...req.body,
            });
            res.status(200).json({
                status: "success",
                message: "Symbol updated successfully",
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
            const response = await SymbolService.delete(req.params.id);
            res.status(200).json({
                status: "success",
                message: "Symbol deleted successfully",
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

export default new SymbolController();

