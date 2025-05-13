import dotenv from "dotenv";
import { DBConfig } from "../types/config.type.js";
import configData from "./config.js";
dotenv.config();

const config: Record<string, DBConfig> = {
    development: {
        use_env_variable: process.env.DB_URL_DEVELOPMENT ?? "",
        username: process.env.DB_USERNAME_DEVELOPMENT ?? configData.development.username,
        password: process.env.DB_PASSWORD_DEVELOPMENT ?? configData.development.password,
        database: process.env.DB_DATABASE_DEVELOPMENT ?? configData.development.database,
        host: process.env.DB_HOST_DEVELOPMENT ?? configData.development.host,
        dialect: process.env.DB_DIALECT_DEVELOPMENT ?? configData.development.dialect,
        dialectOptions: {
            connectTimeout: 30000,
        },
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        logging: console.log,
        timezone: '+07:00',
    },
    production: {
        use_env_variable: process.env.DB_URL_PRODUCTION ?? "",
        username: process.env.DB_USERNAME_PRODUCTION ?? configData.production.username,
        password: process.env.DB_PASSWORD_PRODUCTION ?? configData.production.password,
        database: process.env.DB_DATABASE_PRODUCTION ?? configData.production.database,
        host: process.env.DB_HOST_PRODUCTION ?? configData.production.host,
        dialect: process.env.DB_DIALECT_PRODUCTION ?? configData.production.dialect,
        timezone: '+07:00',
    },
};

export default config;