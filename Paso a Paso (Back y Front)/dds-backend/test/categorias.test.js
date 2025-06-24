import request from "supertest";
import app from "../index.js";

import inicializarBase from '../models/inicializarBase.js';

beforeAll(async () => {
  await inicializarBase(); // crea tablas e inserta datos
});

describe("GET /api/categorias", function () {
  it("Devolveria todos los categorias", async function () {
    const res = await request(app)
      .get("/api/categorias")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdCategoria: expect.any(Number),
          Nombre: expect.any(String),
        }),
      ])
    );
  });
});


describe("GET /api/categorias/:id", function () {
  it("respond with json containing a single categorias", async function () {
    const res = await request(app)
      .get("/api/categorias/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdCategoria: 1,
        Nombre: expect.any(String),
      })
    );
  });
});

describe("GET /api/categorias/:id - no existe", () => {
  it("debería devolver 404 y mensaje de categoría no encontrada", async () => {
    const res = await request(app).get("/api/categorias/9999");
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: "categoria no encontrado" });
  });
});
