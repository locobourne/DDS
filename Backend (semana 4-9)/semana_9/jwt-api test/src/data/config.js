import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("posts.sqlite", "", "", {
    dialect: "sqlite",
    // host: ":memory",
    host: "src/data/db.sqlite"
});