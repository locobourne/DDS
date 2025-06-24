import Express from 'express';
import VeterinariaSvc from '../services/veterinariasvc.js';

const router = Express.Router();

router.get('/api/pacientes', async (req, res) => {
    try {

        const { propietario } = req.query;
        const pacientes = propietario
            ? await VeterinariaSvc.getAllByPropietario(propietario)
            : await VeterinariaSvc.getAll()
        res.json(pacientes)

    } catch (error) {

        res.status(500).json({error: 'Error al obtener los pacientes'});

    }
});

router.get('/api/pacientes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const paciente = await VeterinariaSvc.getPacienteById(id);

        if (!paciente){
            return res.status(404).json({error: 'No se encontro el id'})
        }

        res.json(paciente);
        
    } catch (error) {
        res.status(500).json({error: 'Error al obtener al paciente'});
        
    }
});

router.put('/api/pacientes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pacienteActualizado = await VeterinariaSvc.updatePaciente(id, req.body);

        if (!pacienteActualizado) {
            return res.status(404).json({error: 'Paciente no encontrado'});
        }
        res.json(pacienteActualizado)
    } catch (error) {
        res.status(400).json({error: 'Error al actualizar el paciente', details: error});        
    }
});

router.delete('/api/pacientes/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await VeterinariaSvc.deletePaciente(id);

        if (!eliminado) {
            return res.status(404).json({error: 'Paciente no encontrado'})
        }
        res.status(204).send()
    } catch (error) {
        res.status(400).json({error: 'Error al eliminar al paciente', details: error});
    }
});

router.post('/api/pacientes', async(req, res ) =>{
    try {
        const nuevoPaciente = await VeterinariaSvc.createPaciente(req.body);
        res.status(201).json(nuevoPaciente);
    } catch (error) {
        res.status(400).json({error: 'Error al crear el paciente', details: error});
    }
});

export default router;