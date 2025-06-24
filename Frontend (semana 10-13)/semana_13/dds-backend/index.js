import express from "express";
import categoriasmockRouter from "./routes/categoriasmock.js";
import inicializarBase from "./models/inicializarBase.js";
import categoriasRouter from "./routes/categorias.js";
import articulosRouter from "./routes/articulos.js";
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

app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

// levantar servidor una vez inicializada la base
const port = 3000;
app.locals.fechaInicio = new Date();

inicializarBase().then(() => {
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
    console.log(`Docs Swagger en http://localhost:${port}/api-docs`);
  });
});
