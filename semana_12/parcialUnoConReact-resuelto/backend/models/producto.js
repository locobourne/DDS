import sequelize from "../data/db.js";
import { DataTypes, Model } from "sequelize";

class Producto extends Model{};

Producto.init({
    id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    nombre: {type: DataTypes.STRING, allowNull: false},
    marca: {type: DataTypes.STRING, allowNull: true},
    tipo: {type: DataTypes.INTEGER, isIn: [[1,2,3,4]], allowNull: false, defaultValue: 1},
    precio: {type: DataTypes.NUMBER, allowNull: false, defaultValue: 0},
    a_reponer: {type: DataTypes.BOOLEAN, allowNull:false, defaultValue: false}
},
{
    sequelize,
    modelName: "Producto",
    tableName: "Productos",
    timestamps: false
});

export default Producto