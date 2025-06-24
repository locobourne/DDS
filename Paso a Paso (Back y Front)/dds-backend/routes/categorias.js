import express from 'express';
import categorias from '../models/categoriasModel.js';

const router = express.Router();


/**
 * @swagger
 * /api/categorias:
 *   get:
 *     tags:
 *       - Categorias
 *     summary: Obtener todas las categorías
 *     description: Retorna la lista completa de categorías disponibles.
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 *       500:
 *         description: Error interno al obtener las categorías.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener las categorías
 */
router.get('/api/categorias', async (req, res) => {
  try {
    const listaCategorias = await categorias.findAll();
    res.json(listaCategorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
});



/**
 * @swagger
 * /api/categorias/{id}:
 *   get:
 *     tags:
 *       - Categorias
 *     summary: Obtener una categoría por su ID
 *     description: Retorna la categoría correspondiente al ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoría a buscar
 *     responses:
 *       200:
 *         description: Categoría encontrada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
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
 *       500:
 *         description: Error interno al obtener la categoría.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener la categoría
 */
router.get('/api/categorias/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const categoria = await categorias.findByPk(id);

    if (categoria) {
      res.json(categoria);
    } else {
      res.status(404).json({ message: 'categoria no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la categoría' });
  }
});



export default router;
