import { v4 as uuidV4 } from "uuid";
import db from "../models/index.js";

class TryoutSectionService {
    async getAll(): Promise<any> {
        try {
            const response = await db.TryoutSection.findAll({
                order: [["createdAt", "DESC"]],
            });
            return response;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }

    async getById(id: string): Promise<any> {
        try {
            const response = await db.TryoutSection.findByPk(id);
            return response;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }

    async create(TryoutSection: any): Promise<any> {
        try {
            const id = uuidV4();
            const response = await db.TryoutSection.create({
                ...TryoutSection,
                id,
            });
            return response;
        } catch (error: any) {
            throw new Error("failed to create: " + error.message);
        }
    }

    async update(id: string, TryoutSection: any): Promise<any> {
        try {
            const isSuccess = await db.TryoutSection.update(
                { ...TryoutSection },
                { where: { id } }
            ).then((res: number[]) => res[0] > 0);

            if (!isSuccess) {
                throw new Error("Not Found");
            }

            const updatedTryoutSection = await db.TryoutSection.findByPk(id);
            return updatedTryoutSection;
        } catch (error: any) {
            throw new Error("failed to update: " + error.message);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            const deletedTryoutSection = await db.TryoutSection.findByPk(id);
            const isSuccess = await db.TryoutSection.destroy({
                where: { id },
            }).then((res: number) => res > 0);

            if (!isSuccess) {
                throw new Error("Not Found");
            }

            return deletedTryoutSection;
        } catch (error: any) {
            throw new Error("failed to delete: " + error.message);
        }
    }
}

export default new TryoutSectionService();
