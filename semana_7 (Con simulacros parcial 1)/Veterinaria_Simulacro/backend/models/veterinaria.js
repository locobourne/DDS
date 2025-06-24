import { Model, DataTypes } from 'sequelize';
import sequelize from '../data/db.js';

class Veterinaria extends Model {}

Veterinaria.init({
    IdPaciente: {type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    NombreMascota: {type: DataTypes.STRING, allowNull: false},
    Propietario: {type: DataTypes.STRING, allowNull: false},
    Telefono: {type: DataTypes.STRING},
    },
    {
        sequelize,
        modelName: 'Veterinaria',
        tableName: 'Clientes',
        timestamps: false,

    }
)

export default Veterinaria;