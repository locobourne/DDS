import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('eventos', '', '', {
    storage: './eventos.db',
    dialect: 'sqlite'
})

