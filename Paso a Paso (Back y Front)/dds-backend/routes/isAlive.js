import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /_isalive:
 *   get:
 *     tags:
 *       - Salud
 *     summary: Endpoint para verificar que el servidor está activo
 *     responses:
 *       200:
 *         description: Servidor activo
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Ejecutandose desde: servidor activo"
 */
router.get('/_isalive', (req, res) => {
  res.status(200).send('Ejecutandose desde: servidor activo');
});

export default router;