export default {
    PORT: +(process.env.PORT || 4000),
    jwtSecret: process.env["jwtSecret"] || "rupertappsupersecret",
    databaseConnectionString: process.env.DATABASE_URL || "postgres://postgres:2115@localhost:5432/rupert-desk-api"
};
