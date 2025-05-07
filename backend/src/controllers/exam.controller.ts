import { Request, Response } from "express";
import AbstractCRUDModel from "../abstracts/model.abstract.js";
import ExamService from "../services/exam.service.js";

class ExamController extends AbstractCRUDModel {
    async getAll(req: Request, res: Response): Promise<any> {
        try {
            const response = await ExamService.getAll();
            res.status(200).json({
                status: "success",
                message: "Exams fetched successfully",
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
            const response = await ExamService.getById(req.params.id);
            res.status(200).json({
                status: "success",
                message: "Exam fetched successfully",
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
            const response = await ExamService.create(req.params.userId, {
                ...req.body,
            });
            res.status(201).json({
                status: "success",
                message: "Exam created successfully",
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
            const response = await ExamService.update(req.params.id, {
                ...req.body,
            });
            res.status(200).json({
                status: "success",
                message: "Exam updated successfully",
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
            const response = await ExamService.delete(req.params.id);
            res.status(200).json({
                status: "success",
                message: "Exam deleted successfully",
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

export default new ExamController();
