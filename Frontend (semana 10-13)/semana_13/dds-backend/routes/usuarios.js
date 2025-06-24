import express from 'express';
import usuarios from '../models/usuariosModel.js';
import auth from '../auth.js';
import { authorizedRoles } from '../middlewares/authorizedRoles.js';

const router = express.Router();


// Obtener todas los usuarios, con seguridad JWT
/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener todas los usuarios (requiere autenticación JWT)
 *     description: >
 *       Retorna todos los usuarios si el usuario autenticado tiene el rol "jefe" o "empleado".
 *       Se valida el token JWT para autenticación y luego el rol para autorización.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       403:
 *         description: Usuario no autorizado para acceder a este recurso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: usuario no autorizado!
 *       500:
 *         description: Error interno al obtener los usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener los usuarios
 */
router.get('/api/usuarios',
  auth.authenticateJWT,
  authorizedRoles(['jefe', 'empleado']),
  async function (req, res, next) {
    try {
      // si llego hasta acá, es porque el token es válido y esta autenticado

      // ahora controlamos autorización, segun el rol
      // (esta parte ya la resuelve el middleware authorizedRoles, pero dejamos el comentario original)
      
      const items = await usuarios.findAll();
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  });

export default router;