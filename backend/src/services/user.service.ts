import { v4 as uuidV4 } from "uuid";
import db from "../models/index.js";
import bycrpt from "bcrypt";

class UserService {
    async getAll(): Promise<any> {
        try {
            const response = await db.User.findAll({
                order: [["createdAt", "DESC"]],
            });
            return response;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }

    async getById(id: string): Promise<any> {
        try {
            const response = await db.User.findByPk(id);
            return response;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }

    async login(email: string, password: string): Promise<any> {
        try {
            const response = await db.User.findOne({
                where: { email },
            });
            if (!response) {
                return null;
            }
            const isMatch = bycrpt.compareSync(
                `${response.id}_${password}`,
                response.password
            );
            if (!isMatch) {
                return null;
            }
            return response;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }

    async create(user: any): Promise<any> {
        try {
            const id = uuidV4();
            const password = await bycrpt.hash(`${id}_${user.password}`, 10);
            const response = await db.User.create({
                ...user,
                id,
                password,
            });
            return response;
        } catch (error: any) {
            throw new Error("failed to create: " + error.message);
        }
    }

    async update(id: string, user: any): Promise<any> {
        try {
            const isSuccess = await db.User.update(
                { ...user },
                { where: { id } }
            ).then((res: number[]) => res[0] > 0);

            if (!isSuccess) {
                throw new Error("Not Found");
            }

            const updatedUser = await db.User.findByPk(id);
            return updatedUser;
        } catch (error: any) {
            throw new Error("failed to update: " + error.message);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            const deletedUser = await db.User.findByPk(id);
            const isSuccess = await db.User.destroy({
                where: { id },
            }).then((res: number) => res > 0);

            if (!isSuccess) {
                throw new Error("Not Found");
            }

            return deletedUser;
        } catch (error: any) {
            throw new Error("failed to delete: " + error.message);
        }
    }
}

export default new UserService();
