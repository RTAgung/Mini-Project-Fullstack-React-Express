import { DataTypes, Model, Sequelize } from "sequelize";
import { TryoutSectionModel } from "../types/tryout_section.type.js";

export default (sequelize: Sequelize) => {
    class TryoutSection extends Model<TryoutSectionModel> {
        static associate(models: any) {
            // Create associations
        }
    }

    TryoutSection.init(
        {
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
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
                defaultValue: null,
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
        },
        {
            sequelize,
            modelName: "TryoutSection",
            tableName: "tryout_sections",
            timestamps: true,
        }
    );

    return TryoutSection;
};

