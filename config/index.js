import dotenv from 'dotenv';

dotenv.config();

export const {
    APP_PORT,
    DEBUG_MODE,
    DB_URL,
    JWT_SECRET,
    REFRESH_TOKEN,
    APP_URL
} = process.env;