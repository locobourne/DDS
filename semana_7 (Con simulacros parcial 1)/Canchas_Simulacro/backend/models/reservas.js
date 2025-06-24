import { Model, DataTypes } from "sequelize";
import sequelize from "../data/db.js";

class Reserva extends Model {}

Reserva.init({
    idReserva: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fechaReserva: { type: DataTypes.DATE, allowNull: false },
    nombreJugador: { type: DataTypes.STRING, allowNull: false , validate: { len: [1, 30] }},
    numeroCancha: { type: DataTypes.INTEGER, allowNull: false },
    cantidadHoras: { type: DataTypes.INTEGER, allowNull: false },
    pagada: { type: DataTypes.BOOLEAN, allowNull: false },
    importe: { type: DataTypes.DECIMAL(10, 2) },
    },
    {
        sequelize,
        modelName: "Reserva",
        tableName: "Reservas",
        timestamps: false,
    }
 );

export default Reserva;