import Veterinaria from "../models/veterinaria.js";
import { Op } from 'sequelize';


async function getAll() {
    return await Veterinaria.findAll({
        order:[['IdPaciente', 'DESC']]
    });
}

async function getAllByPropietario(propietario) {
    return await Veterinaria.findAll({
        where: {
            Propietario: {
                [Op.like]: `%${propietario}%`
            }
        },
        order:[['Propietario', 'ASC'], 
                ['IdPaciente', 'DESC']]
    });
}

async function getPacienteById(paciente) {
    return await Veterinaria.findOne({
        where: {
            IdPaciente: {
                [Op.eq]: paciente
            }
        }
    });
}

async function updatePaciente(idPaciente, datosActualizados) {
    const paciente = await Veterinaria.findOne({
        where: {
            IdPaciente: {
                [Op.eq]: IdPaciente
            }
        }
    });
    if (paciente) {
        await paciente.update(datosActualizados);
        return paciente;
    }
    return null;
}


async function deletePaciente(idPaciente) {
    const paciente = await Veterinaria.findOne({
        where: {
            IdPaciente: {
                [Op.eq]: IdPaciente
            }
        }
    });
    if (paciente) {
        await paciente.destroy();
        return true;
    }
    return false;
}


async function createPaciente(datosPaciente) {
    const nuevoPaciente = await Veterinaria.create(datosPaciente);
    return nuevoPaciente;
}

export default { getAll, getAllByPropietario, getPacienteById, updatePaciente, deletePaciente, createPaciente}