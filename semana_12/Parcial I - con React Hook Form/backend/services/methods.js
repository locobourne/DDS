import Producto from "../models/producto.js";
import {Op} from "sequelize";

async function getAllNoRepo() {
    return await Producto.findAll({
        where: {
            a_reponer: false
        }
    })
};

async function getProductosPorNombre(nombre) {
    return await Producto.findAll({
        where: {
            nombre: {
                [Op.like]: `%${nombre}%`
            },
            a_reponer: false
        }
    });
};

async function crearProducto(datos) {
    try {
        const nuevoProducto = await Producto.create({
            nombre: datos.nombre,
            marca: datos.marca,
            tipo: datos.tipo,
            precio: datos.precio,
            a_reponer: datos.a_reponer,
        });
        return nuevoProducto;
    } catch (error) {
        console.log("Error al crear el producto")
    }
};

export default { getAllNoRepo, getProductosPorNombre, crearProducto }