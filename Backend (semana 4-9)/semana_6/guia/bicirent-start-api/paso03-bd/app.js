/* eslint-disable consistent-return */
import express from "express";
import sequelize from "./db.js"; // Importamos la conexión a la base de datos
import Barrio from "./models/barrio.js";
import Estacion from "./models/estacion.js";
import cors from 'cors';
import { Op } from 'sequelize';

Barrio.hasMany(Estacion, { foreignKey: 'idBarrio' });
Estacion.belongsTo(Barrio, { foreignKey: 'idBarrio' });

const app = express();
const PORT = 3000; // Definido directamente, sin usar process.env

// Agregamos al servidor, por ahora, la capacidad de servir archivos estáticos
// (HTML, CSS, JS) desde la carpeta "public"
// Esto es útil para servir archivos de frontend, como el HTML y CSS de la app
//  lo volvemos un servidor de recursos en lugar de LiveServer
//  y la carpeta raíz es public

app.use(cors());  
app.use(express.static("public"));

// Lista de barrios (mock) - sin base de datos por ahora
const barrios = [
    { id: 1, nombre: "Nueva Córdoba" },
    { id: 2, nombre: "Centro" },
    { id: 3, nombre: "Ciudad Universitaria" },
    { id: 4, nombre: "General Paz" },
    { id: 5, nombre: "Alberdi" },
    { id: 6, nombre: "Jardín" },
];

// Ruta principal con una vista "bonita" de servidor funcionando
app.get("/", (req, res) => {
    res.send(`
      <html>
        <head>
          <title>Servidor Express</title>
          <style>
            body {
              background-color: #f2f2f2;
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            .container {
              background: #fff;
              padding: 2rem;
              border-radius: 12px;
              box-shadow: 0 0 12px rgba(0,0,0,0.1);
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🚀 Servidor Express Activo</h1>
            <p>API corriendo en <strong>http://localhost:${PORT}</strong></p>
          </div>
        </body>
      </html>
  `);
});

// Ruta de health-check
app.get("/health-check", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Ruta de echo: repite el mensaje recibido como query param
app.get("/echo", (req, res) => {
    let mensaje = req.query.mensaje || "No se recibió ningún mensaje";
    if (mensaje !== "No se recibió ningún mensaje") mensaje += ` ${mensaje}`;
    res.status(200).json({ recibido: mensaje });
});

app.get("/api/barrios", async (req, res) => {
    const rowBarrios = await Barrio.findAll({
        order: [["nombre", "ASC"]],
    });
    if (!rowBarrios) {
        return res.status(404).json({ error: "No se encontraron barrios" });
    }
    // Convertir a un array de objetos
    const barriosOrdenados = rowBarrios.map((barrio) => ({
        idBarrio: barrio.idBarrio,
        nombre: barrio.nombre,
    }));
    // Enviar la respuesta como JSON
    res.status(200).json(barriosOrdenados);
});

app.get("/api/estaciones", async (req, res) => {
  try {
    const { incluirInactivas, barrio, texto } = req.query;

    const whereCond = {};

    if (!incluirInactivas || incluirInactivas === 'false') {
      whereCond.activa = 1;
    }

    if (barrio && barrio !== "Todos") {
      whereCond.idBarrio = barrio;  // aquí barrio es idBarrio numérico (string ok)
    }

    if (texto && texto.trim() !== "") {
      whereCond[Op.or] = [
        { nombre: { [Op.like]: `%${texto}%` } },
        { direccion: { [Op.like]: `%${texto}%` } }
      ];
    }

    const estaciones = await Estacion.findAll({
      where: whereCond,
      include: [{ model: Barrio, attributes: ['nombre'] }],
      order: [["nombre", "ASC"]],
      limit: 10,
    });

    if (!estaciones) {
      return res.status(404).json({ error: "No se encontraron estaciones" });
    }

    // Convertir a JSON simple y agregar nombre barrio plano
    const estacionesConBarrio = estaciones.map(est => {
      const jsonEst = est.toJSON();
      jsonEst.barrioNombre = est.Barrio ? est.Barrio.nombre : null;
      return jsonEst;
    });

    res.status(200).json(estacionesConBarrio);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener estaciones" });
  }
});

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

(async function main() {
    try {
        await sequelize.authenticate();
        console.log("✔ Conexión establecida con la base de datos");
    }
    catch (error) {
        console.error("❌ Error al conectar con la base de datos:", error);
        process.exit(1); // Salir del proceso si no se puede conectar
    }

    // Iniciar servidor
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
}());
