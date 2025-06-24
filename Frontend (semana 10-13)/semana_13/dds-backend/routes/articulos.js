import express from "express";
import articulos from '../models/articulosModel.js';
import { Op, ValidationError } from "sequelize";

const router = express.Router();

/**
 * @swagger
 * /api/articulos:
 *   get:
 *     tags:
 *       - Articulos
 *     summary: obtiene todos los Articulos
 *     description: consulta de artículos con filtros y paginación
 *     parameters:
 *       - in: query
 *         name: Nombre
 *         schema:
 *           type: string
 *         description: filtra artículos cuyo nombre contiene el texto dado
 *       - in: query
 *         name: Activo
 *         schema:
 *           type: boolean
 *         description: filtra artículos según estén activos (true) o inactivos (false)
 *       - in: query
 *         name: Pagina
 *         schema:
 *           type: integer
 *           default: 1
 *         description: número de página para paginación (10 ítems por página)
 *     responses:
 *       200:
 *         description: lista paginada de artículos y total de registros
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Articulo'
 *                 RegistrosTotal:
 *                   type: integer
 */
router.get("/api/articulos", async function (req, res) {
  // consulta de artículos con filtros y paginación
  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }
  if (req.query.Activo != undefined && req.query.Activo !== "") {
    // true o false en el modelo, en base de datos es 1 o 0
    // convertir el string a booleano
    where.Activo = req.query.Activo === "true";
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await articulos.findAndCountAll({
    attributes: [
      "IdArticulo",
      "Nombre",
      "Precio",
      "Stock",
      "FechaAlta",
      "Activo",
    ],
    order: [["Nombre", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

/**
 * @swagger
 * /api/articulos/{id}:
 *   get:
 *     tags:
 *       - Articulos
 *     summary: Obtiene un Artículo
 *     description: Devuelve el artículo cuyo ID coincide con el parámetro proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador del Artículo
 *     responses:
 *       200:
 *         description: Artículo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articulo'
 *       404:
 *         description: Artículo no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/api/articulos/:id", async function (req, res) {
   let items = await articulos.findOne({
    attributes: [
      "IdArticulo",
      "Nombre",
      "Precio",
      "CodigoDeBarra",
      "IdCategoria",
      "Stock",
      "FechaAlta",
      "Activo",
    ],
    where: { IdArticulo: req.params.id },
  });
  res.json(items);
});

/**
 * @swagger
 * /api/articulos:
 *   post:
 *     tags:
 *       - Articulos
 *     summary: Agrega un Artículo
 *     description: Crea un nuevo artículo con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Articulo'
 *     responses:
 *       200:
 *         description: Registro del artículo agregado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articulo'
 *       400:
 *         description: Error de validación en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */
router.post("/api/articulos/", async (req, res) => {
  try {
    let item = await articulos.create({
      Nombre: req.body.Nombre,
      Precio: req.body.Precio,
      CodigoDeBarra: req.body.CodigoDeBarra,
      IdCategoria: req.body.IdCategoria,
      Stock: req.body.Stock,
      FechaAlta: req.body.FechaAlta,
      Activo: req.body.Activo,
    });
    res.status(200).json(item.dataValues); // devolvemos el registro agregado!
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});


/**
 * @swagger
 * /api/articulos/{id}:
 *   put:
 *     tags:
 *       - Articulos
 *     summary: Actualiza un Artículo
 *     description: Modifica los datos de un artículo existente según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador del Artículo a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Articulo'
 *     responses:
 *       204:
 *         description: Actualización exitosa, sin contenido en la respuesta.
 *       400:
 *         description: Error de validación en los datos enviados.
 *       404:
 *         description: Artículo no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/api/articulos/:id", async (req, res) => {
  try {
    let item = await articulos.findOne({
      attributes: [
        "IdArticulo",
        "Nombre",
        "Precio",
        "CodigoDeBarra",
        "IdCategoria",
        "Stock",
        "FechaAlta",
        "Activo",
      ],
      where: { IdArticulo: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Artículo no encontrado" });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.Precio = req.body.Precio;
    item.CodigoDeBarra = req.body.CodigoDeBarra;
    item.IdCategoria = req.body.IdCategoria;
    item.Stock = req.body.Stock;
    item.FechaAlta = req.body.FechaAlta;
    item.Activo = req.body.Activo;
    await item.save();

    // otra forma de hacerlo
    // let data = await articulos.update(
    //   {
    //     Nombre: req.body.Nombre,
    //     Precio: req.body.Precio,
    //     CodigoDeBarra: req.body.CodigoDeBarra,
    //     IdCategoria: req.body.IdCategoria,
    //     Stock: req.body.Stock,
    //     FechaAlta: req.body.FechaAlta,
    //     Activo: req.body.Activo,
    //   },
    //   { where: { IdArticulo: req.params.id } }
    // );
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});


/**
 * @swagger
 * /api/articulos/{id}:
 *   delete:
 *     tags:
 *       - Articulos
 *     summary: Elimina un Artículo
 *     description: Si `bajaFisica` es true, borra permanentemente el artículo; si es false, alterna el estado Activo (baja lógica).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador del Artículo a eliminar.
 *     responses:
 *       200:
 *         description: Eliminación exitosa (o cambio de estado en baja lógica).
 *       404:
 *         description: Artículo no encontrado (solo en baja física).
 *       400:
 *         description: Error de validación en los datos (solo si ValidationError).
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/api/articulos/:id", async (req, res) => {
  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await articulos.destroy({
      where: { IdArticulo: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica, si esta activo lo desactiva y viceversa
    try {
      let data = await articulos.sequelize.query(
        "UPDATE articulos SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdArticulo = :IdArticulo",
        {
          replacements: { IdArticulo: +req.params.id },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validación, los devolvemos
        const messages = err.errors.map((x) => x.message);
        res.status(400).json(messages);
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  }
});


export default router;
