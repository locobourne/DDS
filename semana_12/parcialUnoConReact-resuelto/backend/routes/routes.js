import Express from "express";
import servicio from "../services/methods.js";

const router = Express.Router();

router.get("/productos", async (_, res) => {
    try {
        const data = await servicio.getAllNoRepo();
        res.json(data)
    }
    catch (error) {
        console.log("Error al obtener Productos");
        res.status(500).json({ error: 'No se encontraron Productos' })
    }
});

router.get("/productos/:nombre", async (req, res) => {
    try {
        const data = await servicio.getProductosPorNombre(req.params.nombre);
        res.json(data)
    }
    catch (error) {
        console.log("No se econtro un producto con ese nombre");
        res.status(500).json({ error: "No hay productos con este nombre" })
    }
});

router.post('/productos', async (req, res) => {
    try {
        console.log(req.body)
        const { nombre, marca, tipo, precio, a_reponer } = req.body;
        const nuevoProducto = await servicio.crearProducto({
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


router.put('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params
        
        if (id) {
            const prod  = req.body;
            const prodActualizado = await servicio.actualizarProducto(id, prod);
            if(prodActualizado)
                res.json(prodActualizado);
            else
                res.status(404).json({mensaje: 'Producto inexistente!'})
        } else {
            return res.status(400).json({ mensaje: 'Ruta a recurso no válida' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});
export default router