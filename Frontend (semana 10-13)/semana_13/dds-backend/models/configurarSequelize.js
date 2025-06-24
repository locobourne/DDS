import { Sequelize } from 'sequelize';

// Configuración de la base de datos SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './.data/pymes.db', // Nombre del archivo de la base de datos  (ruta desde la raíz del proyecto)
  define: {
    freezeTableName: true,  // no pluraliza los nombres de las tablas, modelo = tabla
    timestamps: false,  // no crea campos de fecha de creación y modificación
  },
  logging: false,  // <--- agregar esta línea para desactivar los logs SQL
});


export default sequelize;
