import { v4 as uuidV4 } from "uuid";
import db from "../models/index.js";
import { parseResponseData } from "../helper/map_response.helper.js";

class TryoutSectionService {
    async getAll(): Promise<any> {
        try {
            const response = await db.TryoutSection.findAll({
                order: [["createdAt", "DESC"]],
            }).then((res: any) => res.map(parseResponseData));
            return response;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }

    async getById(id: string): Promise<any> {
        try {
            const response = await db.TryoutSection.findByPk(id).then(
                (res: any) => parseResponseData(res)
            );

            return response;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }

    async create(TryoutSection: any): Promise<any> {
        try {
            const id = uuidV4();
            await db.TryoutSection.create({ ...TryoutSection, id });
            const response = await this.getById(id);
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

            const updatedTryoutSection = await this.getById(id);
            return updatedTryoutSection;
        } catch (error: any) {
            throw new Error("failed to update: " + error.message);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            const deletedTryoutSection = await this.getById(id);
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
