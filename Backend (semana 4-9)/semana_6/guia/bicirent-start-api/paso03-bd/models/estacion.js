import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';

class Estacion extends Model {}

Estacion.init({
  idEstacion: {
    type: DataTypes.INTEGER,
    field: 'ID_ESTACION',
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    field: 'NOMBRE',
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    field: 'DIRECCION',
  },
  idBarrio: {
    type: DataTypes.INTEGER,
    field: 'ID_BARRIO',
  },
  latitud: {
    type: DataTypes.REAL,
    field: 'LATITUD',
  },
  longitud: {
    type: DataTypes.REAL,
    field: 'LONGITUD',
  },
  activa: {
    type: DataTypes.INTEGER,
    field: 'ACTIVA',
    defaultValue: 1,
  },
}, {
  sequelize,
  modelName: 'Estacion',
  tableName: 'ESTACIONES',
  timestamps: false,
});

export default Estacion;