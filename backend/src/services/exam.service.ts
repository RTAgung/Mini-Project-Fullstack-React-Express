import { v4 as uuidV4 } from "uuid";
import db from "../models/index.js";
import { parseResponseData } from "../helper/map_response.helper.js";

class ExamService {
    async getAll(): Promise<any> {
        try {
            const response = await db.Exam.findAll({
                order: [["createdAt", "DESC"]],
            }).then((res: any) => res.map(parseResponseData));
            return response;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }

    async getById(id: string): Promise<any> {
        try {
            const response = await db.Exam.findByPk(id).then((res: any) =>
                parseResponseData(res)
            );
            return response;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }

    async create(userId: string, exam: any): Promise<any> {
        try {
            const id = uuidV4();
            await db.Exam.create({ ...exam, id, userId });
            const response = await this.getById(id);
            return response;
        } catch (error: any) {
            throw new Error("failed to create: " + error.message);
        }
    }

    async update(id: string, exam: any): Promise<any> {
        try {
            const isSuccess = await db.Exam.update(
                { ...exam },
                { where: { id } }
            ).then((res: number[]) => res[0] > 0);

            if (!isSuccess) {
                throw new Error("Not Found");
            }

            const updatedExam = await this.getById(id);
            return updatedExam;
        } catch (error: any) {
            throw new Error("failed to update: " + error.message);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            const deletedExam = await this.getById(id);
            const isSuccess = await db.Exam.destroy({
                where: { id },
            }).then((res: number) => res > 0);

            if (!isSuccess) {
                throw new Error("Not Found");
            }

            return deletedExam;
        } catch (error: any) {
            throw new Error("failed to delete: " + error.message);
        }
    }
}

export default new ExamService();
