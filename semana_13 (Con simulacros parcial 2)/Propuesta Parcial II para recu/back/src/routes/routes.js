import { Router } from "express";
import service from "../services/service.js";

const router = Router();

// GET ajustes (todos)
router.get("/ajustes", async (req, res) => {
  try {
    res.json(await service.getAllAjustes());
  } catch (error) {
    res.status(500).send({ mensaje: "Ha ocurrido un error interno." });
  }
});

// GET productos (todos)
router.get("/productos", async (_, res) => {
  try {
    res.json(await service.getAllProductos());
  } catch (error) {
    res.status(500).send({ mensaje: "Ha ocurrido un error interno. " + error });
  }
});

// POST ajuste (crear nuevo)
router.post("/ajustes", async (req, res) => {
  try {
    const ajuste = await service.createAjuste(req.body);
    return res.json(ajuste);
  } catch (error) {
    console.log(error);
    res.status(500).send({ mensaje: "Ha ocurrido un error interno." });
  }
});

// PUT ajuste (modificar uno por ID)
router.put("/ajustes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { Producto_id, Fecha, Motivo, Cantidad } = req.body;

    const ajuste = await service.updateAjuste(id, {
      Producto_id,
      Fecha,
      Motivo,
      Cantidad
    });

    if (!ajuste) {
      return res.status(404).send({ mensaje: "Ajuste no encontrado" });
    }

    res.json(ajuste);
  } catch (error) {
    console.log(error);
    res.status(500).send({ mensaje: "Error al actualizar el ajuste" });
  }
});

// DELETE ajuste (eliminar uno por ID)
router.delete("/ajustes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const eliminado = await service.deleteAjuste(id);

    if (!eliminado) {
      return res.status(404).send({ mensaje: "Ajuste no encontrado" });
    }

    res.json({ mensaje: "Ajuste eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ mensaje: "Error al eliminar el ajuste" });
  }
});

export default router;
