import { DataTypes, Model, Sequelize } from "sequelize";
import { UserModel } from "../types/user.type.js";

export default (sequelize: Sequelize) => {
    class User extends Model<UserModel> {
        static associate(models: any) {
            // Create associations
            User.hasMany(models.Exam, {
                foreignKey: "userId",
                as: "exams",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            fullname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            data: {
                type: DataTypes.JSON,
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
            modelName: "User",
            tableName: "users",
        }
    );

    return User;
};
