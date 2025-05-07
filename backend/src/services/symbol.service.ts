import { v4 as uuidV4 } from "uuid";
import db from "../models/index.js";
import { parseResponseData } from "../helper/map_response.helper.js";

class SymbolService {
    async getAll(): Promise<any> {
        try {
            const response = await db.Symbol.findAll({
                order: [["createdAt", "DESC"]],
            }).then((res: any) => res.map(parseResponseData));
            return response;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }

    async getById(id: string): Promise<any> {
        try {
            const response = await db.Symbol.findByPk(id).then((res: any) =>
                parseResponseData(res)
            );
            return response;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }

    async create(symbol: any): Promise<any> {
        try {
            const id = uuidV4();
            await db.Symbol.create({ ...symbol, id });
            const response = await this.getById(id);
            return response;
        } catch (error: any) {
            throw new Error("failed to create: " + error.message);
        }
    }

    async update(id: string, symbol: any): Promise<any> {
        try {
            const isSuccess = await db.Symbol.update(
                { ...symbol },
                { where: { id } }
            ).then((res: number[]) => res[0] > 0);

            if (!isSuccess) {
                throw new Error("Not Found");
            }

            const updatedSymbol = await this.getById(id);
            return updatedSymbol;
        } catch (error: any) {
            throw new Error("failed to update: " + error.message);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            const deletedSymbol = await this.getById(id);
            const isSuccess = await db.Symbol.destroy({
                where: { id },
            }).then((res: number) => res > 0);

            if (!isSuccess) {
                throw new Error("Not Found");
            }

            return deletedSymbol;
        } catch (error: any) {
            throw new Error("failed to delete: " + error.message);
        }
    }
}

export default new SymbolService();
