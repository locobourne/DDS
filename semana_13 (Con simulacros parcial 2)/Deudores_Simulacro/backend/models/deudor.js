// models/deudor.js
import { DataTypes } from 'sequelize';
import sequelize from './database.js';

const Deudor = sequelize.define('Deudor', {
  nombreApellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  importe: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fechaDeuda: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  }
});

export default Deudor;
