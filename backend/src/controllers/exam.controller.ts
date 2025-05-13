import { Request, Response } from "express";
import AbstractCRUDModel from "../abstracts/model.abstract.js";
import ExamService from "../services/exam.service.js";
import ExamHelper from "../helper/exam.helper.js";

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

    async getAllByUserId(req: Request, res: Response): Promise<any> {
        try {
            const response = await ExamService.getAllByUserId(
                req.params.userId
            );
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
            const tryoutSectionId = req.body.tryoutSectionId;
            const data = await ExamHelper.generateNewExamData(tryoutSectionId);
            const response = await ExamService.create(req.params.userId, {
                ...req.body,
                data,
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

    async startSession(req: Request, res: Response): Promise<any> {
        try {
            const getResponse = await ExamService.getById(req.params.id);
            const data = getResponse.data;
            if (data.sessions[data.currentSession].status !== "not-started") {
                res.status(200).json({
                    status: "success",
                    message: "Session already started",
                    data: getResponse,
                });
                return;
            }

            const updatedData = await ExamHelper.startSession(data);
            const updatedResponse = await ExamService.update(req.params.id, {
                data: updatedData,
            });
            res.status(200).json({
                status: "success",
                message: "Session started successfully",
                data: updatedResponse,
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async endSession(req: Request, res: Response): Promise<any> {
        try {
            const data = await ExamService.getById(req.params.id).then(
                (res) => res.data
            );
            const updatedData = await ExamHelper.endSession(data);
            const response = await ExamService.update(req.params.id, {
                data: updatedData,
            });
            res.status(200).json({
                status: "success",
                message: "Session ended successfully",
                data: response,
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async endExam(req: Request, res: Response): Promise<any> {
        try {
            const data = await ExamService.getById(req.params.id).then(
                (res) => res.data
            );
            const updatedData = await ExamHelper.endExam(data);
            const response = await ExamService.update(req.params.id, {
                data: updatedData,
            });
            res.status(200).json({
                status: "success",
                message: "Exam ended successfully",
                data: response,
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async nextQuestion(req: Request, res: Response): Promise<any> {
        try {
            const data = await ExamService.getById(req.params.id).then(
                (res) => res.data
            );
            const updatedData = await ExamHelper.nextQuestion(
                data,
                req.body.answer
            );
            const response = await ExamService.update(req.params.id, {
                ...req.body,
                data: updatedData,
            });
            res.status(200).json({
                status: "success",
                message: "Next question successfully",
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

    async filteredStatus(
        req: Request,
        res: Response,
        status: string
    ): Promise<any> {
        try {
            const response = await ExamService.getAllByUserIdAndStatus(
                req.params.userId,
                status
            );
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
