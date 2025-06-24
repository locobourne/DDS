import express from 'express'
const router = express.Router();

let arr_CategoriasMock = [
  {
    "IdCategoria": 1,
    "Nombre": "ACCESORIOS"
  },
  {
    "IdCategoria": 2,
    "Nombre": "AUDIO"
  },
  {
    "IdCategoria": 3,
    "Nombre": "CELULARES"
  },
  {
    "IdCategoria": 4,
    "Nombre": "CUIDADO PERSONAL"
  },
  {
    "IdCategoria": 5,
    "Nombre": "DVD"
  },
  {
    "IdCategoria": 6,
    "Nombre": "FOTOGRAFIA"
  },
  {
    "IdCategoria": 7,
    "Nombre": "FRIO-CALOR"
  },
  {
    "IdCategoria": 8,
    "Nombre": "GPS"
  },
  {
    "IdCategoria": 9,
    "Nombre": "INFORMATICA"
  },
  {
    "IdCategoria": 10,
    "Nombre": "LED-LCD"
  }
];

/**
 * @swagger
 * /api/categoriasmock:
 *   get:
 *     tags:
 *       - CategoriasMock
 *     summary: Obtener categorías mock con filtros opcionales
 *     description: >
 *       Devuelve una lista de categorías mock filtradas por IdCategoria y/o Nombre.
 *       Si no hay resultados, retorna 404.
 *     parameters:
 *       - in: query
 *         name: IdCategoria
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filtrar por IdCategoria exacto
 *       - in: query
 *         name: Nombre
 *         schema:
 *           type: string
 *         required: false
 *         description: Filtrar por Nombre (insensible a mayúsculas)
 *     responses:
 *       200:
 *         description: Lista filtrada de categorías mock
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CategoriaMock'
 *       404:
 *         description: No se encontraron categorías con los filtros aplicados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: categoria no encontrado
 */
router.get('/api/categoriasmock', async function (req, res) {
  const { IdCategoria, Nombre } = req.query;

  let resultado = arr_CategoriasMock;

  if (IdCategoria) {
    resultado = resultado.filter(x => x.IdCategoria == IdCategoria);
  }

  if (Nombre) {
    resultado = resultado.filter(x =>
      x.Nombre.toLowerCase().includes(Nombre.toLowerCase())
    );
  }

  if (resultado.length > 0) {
    res.json(resultado);
  } else {
    res.status(404).json({ message: 'categoria no encontrado' });
  }
});


/**
 * @swagger
 * /api/categoriasmock/:
 *   post:
 *     tags:
 *       - CategoriasMock
 *     summary: Crear una nueva categoría mock
 *     description: Crea una categoría con un nombre y un IdCategoria generado aleatoriamente, y la agrega a la colección mock.
 *     requestBody:
 *       description: Objeto con el nombre de la categoría a crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre:
 *                 type: string
 *                 example: Electrónica
 *             required:
 *               - Nombre
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaMock'
 */
router.post('/api/categoriasmock/', (req, res) => {
  const { Nombre } = req.body;
  let categoria = {
    Nombre,
    IdCategoria: Math.floor(Math.random()*100000),
  };

  // aqui agregar a la coleccion
  arr_CategoriasMock.push(categoria);

  res.status(201).json(categoria);
});


/**
 * @swagger
 * /api/categoriasmock/{id}:
 *   put:
 *     tags:
 *       - CategoriasMock
 *     summary: Actualizar una categoría mock por Id
 *     description: Actualiza el nombre de una categoría mock existente según el Id proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id de la categoría a actualizar
 *     requestBody:
 *       description: Nuevo nombre para la categoría
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre:
 *                 type: string
 *                 example: Electrónica Actualizada
 *             required:
 *               - Nombre
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: categoria actualizado
 *       404:
 *         description: Categoría no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: categoria no encontrado
 */
router.put('/api/categoriasmock/:id', (req, res) => {
  let categoria = arr_CategoriasMock.find(
    (x) => x.IdCategoria == req.params.id
  );

  if (categoria) {
    const { Nombre } = req.body;
    categoria.Nombre = Nombre;
    res.json({ message: 'categoria actualizado' });
  } else {
    res.status(404).json({ message: 'categoria no encontrado' })
  }
});


/**
 * @swagger
 * /api/categoriasmock/{id}:
 *   delete:
 *     tags:
 *       - CategoriasMock
 *     summary: Eliminar una categoría mock por Id
 *     description: Elimina una categoría mock existente según el Id proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id de la categoría a eliminar
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: categoria eliminado
 *       404:
 *         description: Categoría no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: categoria no encontrado
 */
router.delete('/api/categoriasmock/:id', (req, res) => {
  let categoria= arr_CategoriasMock.find(
    (x) => x.IdCategoria == req.params.id
  );

  if (categoria) {
    arr_CategoriasMock = arr_CategoriasMock.filter(
      (x) => x.IdCategoria != req.params.id
    );
    res.json({ message: 'categoria eliminado' });
  } else {
    res.status(404).json({ message: 'categoria no encontrado' })
  }
});




export default router
