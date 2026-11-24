import { Router } from "express";
import service from "../services/service.js";

const router = Router();

router.get("/ajustes", async (req, res) => {
  try {
    res.json(await service.getAllAjustes());
  } catch (error) {
    res.status(500).send({ mensaje: "Ha ocurrido un error interno." });
  }
});

router.get("/productos", async (_, res) => {
  try {
    res.json(await service.getAllProductos());
  } catch (error) {
    res.status(500).send({ mensaje: "Ha ocurrido un error interno." + error });
  }
});

router.post("/ajustes", async (req, res) => {
  try {
    const ajuste = await service.createAjuste(req.body);
    return res.json(ajuste);
  } catch (error) {
    console.log(error);
    res.status(500).send({ mensaje: "Ha ocurrido un error interno." });
  }
});

export default router;
