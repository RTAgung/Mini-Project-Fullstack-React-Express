import { DataTypes, Model, Sequelize } from "sequelize";
import { ExamModel } from "../types/exam.type.js";

export default (sequelize: Sequelize) => {
    class Exam extends Model<ExamModel> {
        static associate(models: any) {
            // Create associations
            Exam.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }

    Exam.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
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
            modelName: "Exam",
            tableName: "exams",
        }
    );

    return Exam;
};
