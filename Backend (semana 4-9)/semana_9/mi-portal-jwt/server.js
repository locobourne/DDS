// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 3001; // Usaremos 3001 para no chocar con otras demos

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// ¡MUY IMPORTANTE! En una aplicación real, esta clave debe ser compleja,
// larga y almacenada de forma segura en una variable de entorno.
const JWT_SECRET = 'clave-super-secreta-para-alumnos-utn-frc-dss-123';

// Simulación de "base de datos" de usuarios.
// En producción, las contraseñas NUNCA deben estar en texto plano. Usar bcrypt.
const users = [
  { id: 1, username: 'ana.perez', password: 'password123', role: 'alumno', nombre: 'Ana Pérez' },
  { id: 2, username: 'juan.lopez', password: 'password456', role: 'alumno', nombre: 'Juan López' },
  { id: 3, username: 'carlos.gomez', password: 'passdocente', role: 'docente', nombre: 'Carlos Gómez' },
  { id: 4, username: 'laura.diaz', password: 'passadmin', role: 'admin', nombre: 'Laura Díaz' }
];

console.log("Usuarios de prueba (usuario/contraseña):");
users.forEach(u => console.log(` - ${u.username} / ${u.password} (Rol: ${u.role})`));
console.log("-------------------------------------------");

// --- MIDDLEWARE DE AUTENTICACIÓN ---
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']; // Formato: "Bearer TOKEN"
  const token = authHeader && authHeader.split(' ')[1]; // Extraer el token

  if (token == null) {
    // No hay token en la solicitud
    return res.status(401).json({ message: 'Acceso denegado. Se requiere token.' });
  }

  jwt.verify(token, JWT_SECRET, (err, userPayload) => {
    if (err) {
      // Token inválido (expirado, firma incorrecta, etc.)
      console.error('Error de verificación de JWT:', err.message);
      let errorMessage = 'Token inválido.';
      if (err.name === 'TokenExpiredError') {
        errorMessage = 'Token expirado. Por favor, inicie sesión de nuevo.';
      }
      return res.status(403).json({ message: `Acceso prohibido. ${errorMessage}` });
    }

    // Token válido, adjuntamos el payload del usuario al objeto request
    req.user = userPayload;
    next(); // Pasamos al siguiente middleware o controlador de ruta
  });
}

// --- MIDDLEWARE DE AUTORIZACIÓN POR ROLES ---
// Esta función es una "fábrica" que devuelve el middleware de autorización real.
// Recibe un array de roles permitidos. Ej: ['admin'], ['docente'], ['alumno', 'docente']
function authorizeRoles(allowedRoles) {
  return (req, res, next) => {
    // Se asume que authenticateToken ya se ejecutó y req.user está disponible
    if (!req.user || !req.user.role) {
      // Esto no debería pasar si authenticateToken se usó primero, pero es una salvaguarda
      return res.status(403).json({ message: 'Acceso prohibido. Rol de usuario no encontrado.' });
    }

    const hasPermission = allowedRoles.includes(req.user.role);
    if (!hasPermission) {
      return res.status(403).json({
        message: `Acceso prohibido. Tu rol ('${req.user.role}') no tiene permiso para acceder a este recurso. Se requiere: ${allowedRoles.join(' o ')}.`
      });
    }

    next(); // El usuario tiene uno de los roles permitidos
  };
}

// --- LOGIN ENDPOINT ---
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
  }

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Credenciales incorrectas.' });
  }

  // Creamos el payload para el JWT
  const payload = {
    userId: user.id,
    username: user.username,
    role: user.role,
    nombre: user.nombre
  };

  // Firmamos el token
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  res.json({
    message: `¡Bienvenido ${user.nombre}! Login exitoso.`,
    token: token,
    user: payload
  });
});

// --- RUTAS DEL PORTAL ---
// 1. RUTA PÚBLICA (ACCESO ANÓNIMO)
app.get('/api/public/noticias', (req, res) => {
  res.json({
    titulo: "¡Bienvenidos al Portal de la UTN FRC!",
    contenido: "Aquí encontrarás las últimas novedades y eventos importantes.",
    fecha: new Date().toLocaleDateString()
  });
});

// 2. RUTA AUTENTICADA (CUALQUIER USUARIO LOGUEADO)
app.get('/api/me/perfil', authenticateToken, (req, res) => {
  // req.user fue establecido por el middleware authenticateToken
  res.json({
    message: `Datos de perfil para ${req.user.nombre}`,
    usuario: req.user // Mostramos toda la info del token
  });
});

// 3. RUTA SOLO PARA ALUMNOS
app.get('/api/alumnos/mis-notas', authenticateToken, authorizeRoles(['alumno']),
(req, res) => {
  // Simulación de notas
  const notas = [
    { materia: "Desarrollo de Software", nota: 8 },
    { materia: "Base de Datos", nota: 7 },
    { materia: "Sistemas Operativos", nota: 9 }
  ];
  res.json({
    message: `Notas para el alumno ${req.user.nombre}`,
    notas: notas,
    promedio: (notas.reduce((sum, n) => sum + n.nota, 0) /
      notas.length).toFixed(2)
  });
});

// 4. RUTA SOLO PARA DOCENTES
app.post('/api/docentes/cargar-nota', authenticateToken,
authorizeRoles(['docente']), (req, res) => {
  const { alumnoId, materia, nota } = req.body;
  if (!alumnoId || !materia || nota === undefined) {
    return res.status(400).json({ message: 'Se requiere alumnoId, materia y nota.' });
  }
  // Aquí iría la lógica para guardar la nota en una base de datos
  res.json({
    message: `Nota ${nota} para la materia ${materia} del alumno ID ${alumnoId} cargada por ${req.user.nombre}.`,
    dataRecibida: req.body
  });
});

// 5. RUTA SOLO PARA ADMINISTRADORES
app.get('/api/admin/usuarios', authenticateToken, authorizeRoles(['admin']), (req,
res) => {
  // Devolvemos todos los usuarios excepto sus contraseñas
  const usersList = users.map(u => ({ id: u.id, username: u.username, role:
    u.role, nombre: u.nombre }));
  res.json({
    message: `Listado de usuarios accedido por ${req.user.nombre} (Admin)`,
    usuarios: usersList
  });
});

// 6. RUTA PARA DOCENTES Y ADMINISTRADORES
app.get('/api/cursos/gestion', authenticateToken, authorizeRoles(['docente',
'admin']), (req, res) => {
  const cursos = [
    { id: "DS001", nombre: "Desarrollo de Software", creditos: 8 },
    { id: "BD002", nombre: "Bases de Datos", creditos: 6 }
  ];
  res.json({
    message: `Acceso a gestión de cursos por ${req.user.nombre} (Rol: ${req.user.role})`,
    cursos: cursos
  });
});

// --- MANEJO DE ERRORES ---
// Middleware para rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ message: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
});

// Middleware de manejo de errores general
app.use((err, req, res, next) => {
  console.error("¡ERROR NO CAPTURADO!:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Ocurrió un error inesperado en el servidor.'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor del Mini Portal escuchando en http://localhost:${PORT}`);
  console.log("¡Recuerda! Las contraseñas están en texto plano SOLO para esta demo.");
});
