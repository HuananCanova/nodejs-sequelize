module.exports = {
    HOST:"localhost",
    USER:"postgres",
    PASSWORD: "2190",
    DB:"db_sequelize",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
};