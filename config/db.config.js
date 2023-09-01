modelu.exports = {
    HOST:"localhost",
    USER:"postgres",
    PASSWORD:"2190",
    DB:"web2",
    dialect: "postgres,",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};