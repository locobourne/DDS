import { DataTypes } from "sequelize";
import { sequelize } from "../data/config.js";

export const Usuario = sequelize.define(
    "Usuario",
    {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        email: { 
            type: DataTypes.STRING, 
            allowNull: false
        },
        clave: { 
            type: DataTypes.STRING, 
            allowNull: false
        },
        rol: { 
            type: DataTypes.STRING, 
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "usuario",
        timestamps: true
    }
);
