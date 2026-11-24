import express from "express";
import cors from "cors";

import routes from "./src/routes/routes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(3001, () => {
  console.log("Servidor iniciado en el puerto 3001");
});
