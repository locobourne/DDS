import Express from "express";
import methods from "../services/methods.js";

const router = Express.Router();

router.get("/productos", async (_, res) => {
    try {
        const data = await methods.getAllNoRepo();
        res.json(data)
    }
    catch (error) {
        console.log("Error al obtener Productos");
        res.status(500).json({ error: 'No se encontraron Productos' })
    }
});

router.get("/productos/:nombre", async (req, res) => {
    try{
        const data = await methods.getProductosPorNombre(req.params.nombre);
        res.json(data)
    }
    catch(error) {
        console.log("No se econtro un producto con ese nombre");
        res.status(500).json({ error: "No hay productos con este nombre" })
    }
});

router.post('/productos', async (req, res) => {
    try {
        console.log(req.body);
        const { nombre, marca, tipo, precio, a_reponer } = req.body;

        const nuevoProducto = await methods.crearProducto({
            nombre,
            marca,
            tipo,
            precio,
            a_reponer
        });

        res.json(nuevoProducto);
    } catch (error) {
        console.log("Error al crear el producto:", error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});

export default router