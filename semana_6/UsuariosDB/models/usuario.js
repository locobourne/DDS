import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/db.js';


class Usuario extends Model { }

Usuario.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false, },
    usuario: { type: DataTypes.STRING, allowNull: false, validate: { len: [8, 16], is: /^[a-zA-Z0-9_]+$/ } },
    password: { type: DataTypes.STRING, allowNull: false, validate: { len: [10, 16], is: /^[a-zA-Z0-9_]+$/ } },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
},
    {
        sequelize,
        modelName: 'Usuario',
        tableName: 'Usuarios',
        timestamps: false,
    }
);


export default Usuario;