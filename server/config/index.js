var config = {
    server: {
        port: process.env.PORT || 8081
    },

    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'chatdual_db_user',
        password: process.env.DB_PASSWORD || '12345',
        name: process.env.DB_NAME || 'chatdual'
    },

    jwt: {
        secret: process.env.JWT_SECRET || "^%#@UH7f77t65adad&@^&&Tfgu&&^2uhhwydywdg",
        expiresIn: process.env.JWT_EXPIRES_IN || '60d'
    }
};

module.exports = config;