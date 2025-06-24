import Reservas from '../models/reservas.js';
import { Op } from 'sequelize';

async function getAll() {
    return await Reservas.findAll({
        order:[['fechaReserva', 'ASC'],
               ['numeroCancha','ASC']]
    });
}

async function getAllByJugador(jugador) {
    return await Reservas.findAll({
        where: {
            nombreJugador: {
                [Op.startsWith]: jugador
            }
        },
        order:[['fechaReserva', 'ASC'],
                ['nombreJugador','ASC']]
        }
    );
}

export default { getAll, getAllByJugador };

