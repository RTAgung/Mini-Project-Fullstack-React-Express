import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidV4 } from "uuid";
import bcrypt from "bcrypt";

export default {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        let users = [];
        for (let i = 1; i <= 3; i++) {
            const id = uuidV4();
            users.push({
                id: id,
                fullname: `Fullname${i}`,
                username: `Username${i}`,
                email: `user${i}@example.com`,
                phoneNumber: `+62${i}123456789`,
                password: bcrypt.hashSync(`${id}_password${i}`, 10),
            });
        }
        await queryInterface.bulkInsert("users", users, {});
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.bulkDelete("users", {});
    },
};
