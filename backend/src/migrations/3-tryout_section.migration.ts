import { DataTypes, QueryInterface } from "sequelize";

export default {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.createTable("tryout_sections", {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
                defaultValue: null,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            order: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: null,
            },
            data: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: null,
            },
            tag: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null,
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
        });
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.dropTable("tryout_sections");
    },
};
