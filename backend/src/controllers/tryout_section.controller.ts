import { Request, Response } from "express";
import AbstractCRUDModel from "../abstracts/model.abstract.js";
import TryoutSectionService from "../services/tryout_section.service.js";
import examConfig from "../config/exam.config.js";

class TryoutSectionController extends AbstractCRUDModel {
    async getAll(req: Request, res: Response): Promise<any> {
        try {
            const response = await TryoutSectionService.getAll();
            res.status(200).json({
                status: "success",
                message: "Tryout sections fetched successfully",
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
            const response = await TryoutSectionService.getById(req.params.id);
            res.status(200).json({
                status: "success",
                message: "Tryout section fetched successfully",
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
            const data = req.body.data;
            data.duration =
                data.durationPerSessions * data.numberOfSessions +
                examConfig.accuracyTest.intervalSessionTime *
                    data.numberOfSessions +
                examConfig.accuracyTest.timeTolerance;
            console.log(data);
            const response = await TryoutSectionService.create({
                ...req.body,
                data,
            });
            res.status(201).json({
                status: "success",
                message: "Tryout section created successfully",
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
            const response = await TryoutSectionService.update(req.params.id, {
                ...req.body,
            });
            res.status(200).json({
                status: "success",
                message: "Tryout section updated successfully",
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
            const response = await TryoutSectionService.delete(req.params.id);
            res.status(200).json({
                status: "success",
                message: "Tryout section deleted successfully",
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

export default new TryoutSectionController();
