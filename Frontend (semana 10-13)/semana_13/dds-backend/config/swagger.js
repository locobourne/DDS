import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Articulos",
      version: "1.0.0",
      description: "Documentación generada con swagger-jsdoc",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local"
      }
    ],
    tags: [
      {
        name: "Articulos",
        description: "Operaciones sobre artículos"
      }
    ],
    components: {
      schemas: {
        Articulo: {
          type: "object",
          properties: {
            IdArticulo:    { type: "integer", example: 1 },
            Nombre:        { type: "string",  example: "Artículo de prueba" },
            Precio:        { type: "number",  example: 99.9 },
            CodigoDeBarra: { type: "string",  example: "1234567890123" },
            IdCategoria:   { type: "integer", example: 2 },
            Stock:         { type: "integer", example: 100 },
            FechaAlta:     { type: "string",  format: "date-time", example: "2025-06-24T12:00:00Z" },
            Activo:        { type: "boolean", example: true }
          },
          required: ["Nombre", "Precio", "Stock", "Activo"]
        }
      }
    }
  },
  apis: ["./routes/*.js"],  // apunta a todos los JS en /routes
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
