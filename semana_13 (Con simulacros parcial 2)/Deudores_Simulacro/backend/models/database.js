import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './deudores.sqlite' // se creará en la raíz del backend
})

export default sequelize
