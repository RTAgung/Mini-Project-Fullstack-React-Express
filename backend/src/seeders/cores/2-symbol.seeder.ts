import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidV4 } from "uuid";

export default {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        let symbols = [];
        for (let i = 1; i <= 2; i++) {
            const id = uuidV4();
            symbols.push({
                id: id,
                code: `code${i}`,
                name: `name${i}`,
                characters: `abcdefghijklmnopqrstuvwxyz${i}`,
            });
        }
        await queryInterface.bulkInsert("symbols", symbols, {});
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.bulkDelete("symbols", {});
    },
};
