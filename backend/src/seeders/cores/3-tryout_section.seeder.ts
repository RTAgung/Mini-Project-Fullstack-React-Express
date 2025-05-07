import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidV4 } from "uuid";

export default {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        let tryoutSections = [];
        for (let i = 1; i <= 3; i++) {
            const id = uuidV4();
            tryoutSections.push({
                id: id,
                code: `code${i}`,
                description: `description${i}`,
                title: `title${i}`,
                order: i,
                tag: `tag${i}`,
            });
        }
        await queryInterface.bulkInsert("tryout_sections", tryoutSections, {});
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.bulkDelete("tryout_sections", {});
    },
};
