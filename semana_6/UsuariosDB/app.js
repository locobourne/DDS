import sequelize from "./db/db.js";
import Usuario from "./models/usuario.js";
import { Op } from 'sequelize';


async function main() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        await Usuario.sync();
        console.log('Base de datos: lista');

        const user = await Usuario.create({
            nombre: 'Luz',
            apellido: 'Lopez',
            usuario: 'LLopez123',
            password: 'LLopez1230',
            email: 'LLopez3@myemail.com'
        });

        console.log('ID del usuario creado:', user.id);

        await Usuario.create({
            nombre: 'Luz',
            apellido: 'Lopez',
            usuario: 'LLopez123',
            password: 'LLopez1230',
            email: 'LLopez4@myemail.com'
        });


        const usuarios = await Usuario.findAll({
            where: {
                [Op.and]: [
                    { usuario: { [Op.like]: 'LLopez1%' } },
                    { email: { [Op.like]: '%@gmail.com' } }]
            },
            order: [['apellido', 'ASC'], ['email', 'DESC']]
        });
        usuarios.forEach((u) => {
            console.log(`${u.id}|${u.nombre}|${u.apellido}|${u.usuario}|${u.email}|`)
        });

        const user1 = await Usuario.findOne({ where: { id: 1 } });
        if (user) {
            user.email = 'nuevoemail2@gmail.com';
            await user.save();
        }

        const user2 = await Usuario.findByPk(1);
        if (user) {
            user.email = 'nuevoemail3@gmail.com';
            await user.save();
        }


    } catch (error) {
        console.log('Ha ocurrido un error con la base de datos: ', error)
    }
};

main();