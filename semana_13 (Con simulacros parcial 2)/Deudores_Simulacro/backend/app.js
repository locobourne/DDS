import express from 'express'
import cors from 'cors'
import sequelize from './models/database.js'
import Deudor from './models/deudor.js'
import router from './routes/deudores.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

async function main() {
  try {
    await sequelize.sync({ force: true })

    await Deudor.bulkCreate([
      { nombreApellido: 'Juan Pérez', importe: 1500.5, fechaDeuda: '2024-05-01' },
      { nombreApellido: 'María Gómez', importe: 2300, fechaDeuda: '2024-06-10' },
      { nombreApellido: 'Carlos López', importe: 1000, fechaDeuda: '2024-04-20' },
    ])

    app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'))
  } catch (err) {
    console.error('Error al iniciar:', err)
  }
}

main()
