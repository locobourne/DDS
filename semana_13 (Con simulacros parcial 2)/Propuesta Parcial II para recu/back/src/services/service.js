import sequelize from "../models/database.js";

// Obtener todos los productos
const getAllProductos = async () => {
  const productos = await sequelize.models.Producto.findAll();
  return productos;
};

// Obtener todos los ajustes
const getAllAjustes = async () => {
  const ajustes = await sequelize.models.AjusteStock.findAll({
    order: [['Fecha', 'DESC']]
  });
  return ajustes;
};

// Crear un nuevo ajuste
const createAjuste = async (ajuste) => {
  const resultado = await sequelize.models.AjusteStock.create({
    Producto_id: ajuste.Producto_id,
    Fecha: ajuste.Fecha,
    Motivo: ajuste.Motivo,
    CantidadAjuste: ajuste.Cantidad
  });

  return resultado;
};

// Actualizar un ajuste por ID
const updateAjuste = async (id, ajuste) => {
  const ajusteExistente = await sequelize.models.AjusteStock.findByPk(id);
  if (!ajusteExistente) return null;

  ajusteExistente.Producto_id = ajuste.Producto_id;
  ajusteExistente.Fecha = ajuste.Fecha;
  ajusteExistente.Motivo = ajuste.Motivo;
  ajusteExistente.CantidadAjuste = ajuste.Cantidad;

  await ajusteExistente.save();
  return ajusteExistente;
};

// Eliminar un ajuste por ID
const deleteAjuste = async (id) => {
  const ajusteExistente = await sequelize.models.AjusteStock.findByPk(id);
  if (!ajusteExistente) return false;

  await ajusteExistente.destroy();
  return true;
};

export default {
  getAllAjustes,
  getAllProductos,
  createAjuste,
  updateAjuste,
  deleteAjuste,
};
