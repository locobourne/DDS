import Express from "express";
import ReservasSvc from '../services/reservassvc.js';

const router = Express.Router();

router.get('/reservas', async(req, res) => {
    if (req.query.jugador != undefined && req.query.jugador !== "") 
    {
        const data = await ReservasSvc.getAllByJugador(req.query.jugador);
        res.json(data);             
    }
    else
    {
        const data = await ReservasSvc.getAll();
        res.json(data);             
    }
});

export default router;