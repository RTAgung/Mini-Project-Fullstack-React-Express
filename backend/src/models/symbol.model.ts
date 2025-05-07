import { DataTypes, Model, Sequelize } from "sequelize";
import { SymbolModel } from "../types/symbol.type.js";

export default (sequelize: Sequelize) => {
    class Symbol extends Model<SymbolModel> {
        static associate(models: any) {
            // Create associations
        }
    }

    Symbol.init(
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
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            characters: {
                type: DataTypes.STRING,
                allowNull: false,
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
            modelName: "Symbol",
            tableName: "symbols",
        }
    );

    return Symbol;
};

