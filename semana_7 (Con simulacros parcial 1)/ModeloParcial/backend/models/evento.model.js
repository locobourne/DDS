import { sequelize } from "../data/cnn-db.js";
import { DataTypes } from "sequelize";

const Evento = sequelize.define('Evento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lugar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    enlace: {
        type: DataTypes.STRING
    },

}, {
    timestamps: false,
    sequelize, 
    tableName: 'eventos'
})

export default Evento