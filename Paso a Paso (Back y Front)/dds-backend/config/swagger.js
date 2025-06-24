import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Articulos y Seguridad",
      version: "1.0.0",
      description: "Documentación generada con swagger-jsdoc",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    tags: [
      {
        name: "Articulos",
        description: "Operaciones sobre artículos",
      },
      {
        name: "Seguridad",
        description: "Autenticación y autorización",
      },
      {
        name: "Usuarios",
        description: "Operaciones sobre usuarios",
      },
      {
        name: "Categorias",
        description: "Operaciones sobre categorías",
      },
      {
        name: "CategoriasMock",
        description: "Operaciones sobre categorías mock",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Articulo: {
          type: "object",
          properties: {
            IdArticulo: { type: "integer", example: 1 },
            Nombre: { type: "string", example: "Artículo de prueba" },
            Precio: { type: "number", example: 99.9 },
            CodigoDeBarra: { type: "string", example: "1234567890123" },
            IdCategoria: { type: "integer", example: 2 },
            Stock: { type: "integer", example: 100 },
            FechaAlta: {
              type: "string",
              format: "date-time",
              example: "2025-06-24T12:00:00Z",
            },
            Activo: { type: "boolean", example: true },
          },
          required: ["Nombre", "Precio", "Stock", "Activo"],
        },
        Usuario: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            nombre: { type: "string", example: "Juan Pérez" },
            email: { type: "string", example: "juan@example.com" },
            rol: { type: "string", example: "jefe" }
          },
          required: ["id", "nombre", "email", "rol"]
        },
        Categoria: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            nombre: { type: "string", example: "Electrónica" },
            descripcion: { type: "string", example: "Productos electrónicos y gadgets" }
          },
          required: ["id", "nombre"]
        },
        CategoriaMock: {
          type: "object",
          properties: {
            IdCategoria: { type: "integer", example: 12345 },
            Nombre: { type: "string", example: "Electrónica" }
          },
          required: ["IdCategoria", "Nombre"]
        },
        LoginRequest: {
          type: "object",
          properties: {
            usuario: { type: "string", example: "admin" },
            clave: { type: "string", example: "123" },
          },
          required: ["usuario", "clave"],
        },
        TokenResponse: {
          type: "object",
          properties: {
            accessToken: { type: "string" },
            refreshToken: { type: "string" },
            message: { type: "string" },
          },
        },
        MessageResponse: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        RefreshTokenRequest: {
          type: "object",
          properties: {
            refreshToken: { type: "string" },
          },
          required: ["refreshToken"],
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
