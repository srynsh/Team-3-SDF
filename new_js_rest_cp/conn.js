import { Sequelize } from "sequelize";

const db = new Sequelize('covid_db', 'root', 'Tsunami123!', {
    host: "localhost",
    dialect: "mysql"
});

export default db;