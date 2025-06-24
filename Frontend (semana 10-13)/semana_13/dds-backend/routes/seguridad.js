import express from "express";
import jwt from "jsonwebtoken";
import auth from "../auth.js";

const router = express.Router();

const users = [
  {
    usuario: "admin",
    clave: "123",
    rol: "jefe",
  },
  {
    usuario: "juan",
    clave: "123",
    rol: "empleado",
  },
];
let refreshTokens = [];

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *       - Seguridad
 *     summary: "Login de usuarios: admin:123 (rol jefe), juan:123 (rol empleado)"
 *     description: Valida las credenciales y retorna un accessToken y refreshToken si son correctas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               clave:
 *                 type: string
 *             required:
 *               - usuario
 *               - clave
 *     responses:
 *       200:
 *         description: Respuesta con tokens o mensaje de error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 message:
 *                   type: string
 */
router.post("/api/login", (req, res) => {
  const { usuario, clave } = req.body;

  // Filter user from the users array by usuario and clave
  const user = users.find((u) => {
    return u.usuario === usuario && u.clave === clave;
  });

  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      auth.accessTokenSecret,
      { expiresIn: "20m" }
    );

    // Avanzado!
    const refreshToken = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      auth.refreshTokenSecret
    );

    refreshTokens.push(refreshToken);

    res.json({
      accessToken,
      refreshToken,
      message: "Bienvenido " + user.usuario + " (rol: " + user.rol + ")",
    });
  } else {
    res.status(401).json({ message: "Usuario o clave incorrectos" });
  }
});


/**
 * @swagger
 * /api/logout:
 *   post:
 *     tags:
 *       - Seguridad
 *     summary: "Logout: invalida el refresh token (no invalida el token actual)"
 *     description: Elimina el refresh token para evitar renovar el access token cuando expire.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Mensaje indicando si el logout fue exitoso o inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.post("/api/logout", (req, res) => {
  // recordar que el token sigue válido hasta que expire, aquí evitamos que pueda renovarse cuando expire!
  let message = null;
  const authHeader = req.headers.authorization;
  let token = null;
  if (authHeader) {
     token = authHeader.split(" ")[1];
  }

  if (refreshTokens.includes(token)) {
    message = "Usuario deslogueado correctamente!";
  }
  else {
    message = "Logout inválido!";
  }


  refreshTokens = refreshTokens.filter((t) => t !== token);

  res.json({ message });
});


/**
 * @swagger
 * /api/refreshtoken:
 *   post:
 *     tags:
 *       - Seguridad
 *     summary: refresh token
 *     description: Solicita un nuevo access token válido usando un refresh token válido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token previamente emitido.
 *     responses:
 *       200:
 *         description: Nuevo access token generado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: No se proporcionó refresh token.
 *       403:
 *         description: Refresh token inválido o expirado.
 */
router.post("/api/refreshtoken", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, auth.refreshTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      auth.accessTokenSecret,
      { expiresIn: "20m" }
    );

    res.json({
      accessToken,
    });
  });
});



export default router;
