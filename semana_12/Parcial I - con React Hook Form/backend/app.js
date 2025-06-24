import express from 'express';
import cors from 'cors';
import router from "./routes/routes.js";
import db from "./data/db.js";
import Producto from "./models/producto.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

async function dbInit() {
  await db.sync({force: true});
  await Producto.bulkCreate([
    {id:1, nombre:"tuerca", marca:"tuerquin", tipo:4, precio:3 ,a_reponer:false},
    {id:2, nombre:"tornillo", marca:"tornillopolis", tipo:4, precio:2 ,a_reponer:true},
    {id:3, nombre:"aceite", marca:"aceite de 10", tipo:1, precio:30 ,a_reponer:false}
  ])
};

dbInit().then(() => {
  app.listen(4000, async () => {
    console.log('Sincronizando base de datos')
  })
})


