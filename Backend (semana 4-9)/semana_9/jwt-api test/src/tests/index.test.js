import request from 'supertest'

describe("GET /api/productos/:id", function () {
    it("Respuesta OK codigo 200 con un objeto encontrado ", async () => {
        const res = await request("localhost:3001")
        .get("/api/productos/1")
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiYWRtaW5AYXBpLmNvbSIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzQ3MjY4NzIzLCJleHAiOjE3NDcyNzU5MjN9.My66GIpaghlS5Q4MYRfcuybCn6fqJHwPPjhHcVFlb08')
        //CAMBIAR LA PETICIÓN HTTP PARA QUE ENVIE JWT TOKEN

        expect(res.statusCode).toEqual(200)
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
        expect(res.body).toEqual(
            expect.objectContaining({
                "id": 1,
                "nombre": expect.any(String)
            })
        );
    }
    )
    it("Respuesta código 404 con mensaje objeto no encontrado", async () => {
        const res = await request("localhost:3001").get(
            "/api/productos/99"
        )
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual(
            expect.objectContaining(
                { mensaje: 'Producto inexistente!' }
            )
        );
    }
    )
});
