import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidV4 } from "uuid";

export default {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        const users: any = await queryInterface.sequelize
            .query("SELECT id FROM users")
            .then((result) => result[0]);

        let exams = [];
        for (let i = 1; i <= 5; i++) {
            const id = uuidV4();
            const user = users[Math.floor(Math.random() * users.length)];

            exams.push({
                id: id,
                userId: user.id,
                tag: `tag${i}`,
            });
        }
        await queryInterface.bulkInsert("exams", exams, {});
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.bulkDelete("exams", {});
    },
};
