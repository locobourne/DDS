import Express from 'express';
import Cors from 'cors';
import db from './data/db.js';
import ReservasModel from './models/reservas.js';
import Reservas from './routes/reservasroutes.js';

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(Reservas);

async function DBInit() {
    await db.sync({ force: true });
    await ReservasModel.bulkCreate([
        { fechaReserva: '2025-04-28 13:00', nombreJugador: 'Carlos Calvo', 
            numeroCancha: '1', cantidadHoras: '1', pagada: '0' },
        { fechaReserva: '2025-04-28 14:00', nombreJugador: 'Juan Juarez', 
            numeroCancha: '2', cantidadHoras: '1', pagada: '0' },
        { fechaReserva: '2025-04-28 15:00', nombreJugador: 'Matias Martin', 
            numeroCancha: '1', cantidadHoras: '1', pagada: '0' },
        { fechaReserva: '2025-04-28 16:00', nombreJugador: 'Laura Lopez', 
            numeroCancha: '2', cantidadHoras: '2', pagada: '0' },
        { fechaReserva: '2025-04-28 17:00', nombreJugador: 'Martin Miranda', 
            numeroCancha: '1', cantidadHoras: '1', pagada: '1', importe: '18000' },
        { fechaReserva: '2025-04-28 18:00', nombreJugador: 'Natalia Noriega', 
            numeroCancha: '2', cantidadHoras: '1', pagada: '1', importe: '18000' },
        { fechaReserva: '2025-04-28 19:00', nombreJugador: 'Andrea Alvarez', 
            numeroCancha: '1', cantidadHoras: '2', pagada: '1', importe: '35000' },
        { fechaReserva: '2025-04-28 20:00', nombreJugador: 'Oscar Ortiz', 
            numeroCancha: '2', cantidadHoras: '3', pagada: '0' } 
    ]);
}

DBInit().then(() => {
    app.listen(3000, async() => console.log('Servidor escuchando peticiones en http://localhost:3000'));
});