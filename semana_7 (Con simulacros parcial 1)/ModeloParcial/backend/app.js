import express from 'express';
import cors from 'cors';
import { sequelize } from './data/cnn-db.js';
import Evento from './models/evento.model.js';
import { Op } from 'sequelize';


const app = express();
app.use(cors());

app.get('/api/events', async (req, res) => {
  try {
    const { lugar } = req.query
    let where = {}

    if (lugar) {
      where = {
        lugar: {
          [Op.like]: `%${lugar}%`
        }
      }
    }
   
    res.json(await Evento.findAll({where: where}))

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar eventos' })
  }
})




//app.delete('/api/events/:id', callback)

app.listen(3001, async () => {
  console.log('API lista en puerto 3001')
  await sequelize.sync()
  console.log('Sincronizando base de datos')

})


