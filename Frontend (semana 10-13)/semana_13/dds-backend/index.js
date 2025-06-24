import express from "express";
import categoriasmockRouter from "./routes/categoriasmock.js";
import inicializarBase from "./models/inicializarBase.js";
import categoriasRouter from "./routes/categorias.js";
import articulosRouter from "./routes/articulos.js";
import seguridadRouter from "./routes/seguridad.js";
import usuariosRouter from "./routes/usuarios.js";
import isAliveRouter from './routes/isAlive.js';
import notFoundMiddleware from './middlewares/notFound.js';
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";


// crear servidor
const app = express();

app.use(express.json());

// configurar servidor
app.use(
  cors({
    origin: "*", // origin: 'https://dds-frontend.azurewebsites.net'
  })
);


// Swagger UI - Documentación API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// rutas
app.use(categoriasRouter);
app.use(categoriasmockRouter);
app.use(articulosRouter);
app.use(seguridadRouter);
app.use(usuariosRouter);
app.use(isAliveRouter);


app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

app.use(notFoundMiddleware);

// levantar servidor una vez inicializada la base
const port = 3000;

inicializarBase().then(() => {
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
    console.log(`Docs Swagger en http://localhost:${port}/api-docs`);
  });
});

export default app; // Para testing con supertest
