import express from 'express';
import Deudor from '../models/deudor.js';

const router = express.Router();

router.post('/deudores', async (req, res) => {
  const { nombreApellido, importe, fechaDeuda } = req.body;
  if (!nombreApellido || !importe || !fechaDeuda) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  try {
    const nuevo = await Deudor.create({ nombreApellido, importe, fechaDeuda });
    res.status(201).json(nuevo);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/deudores', async (req, res) => {
  try {
    const deudores = await Deudor.findAll();
    res.json(deudores);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
