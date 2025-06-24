import Express from 'express';
import Cors from 'cors';
import db from './data/db.js';
import VeterinariaModels from './models/veterinaria.js';
import Veterinaria from './routes/veterinariaroutes.js';

const app = Express()

app.use(Express.json());
app.use(Cors());
app.use(Veterinaria);

async function DBinit() {
    await db.sync({ force: true });
    await VeterinariaModels.bulkCreate([
        { NombreMascota: 'Fido', Propietario: 'Juan Perez', Telefono: '1122334455' },
        { NombreMascota: 'Michi', Propietario: 'Maria Garcia', Telefono: '3515566778' },
        { NombreMascota: 'Rex', Propietario: 'Juan Perez', Telefono: '1122334455' },
        { NombreMascota: 'Nina', Propietario: 'Carlos Lopez', Telefono: '1133445566' },
        { NombreMascota: 'Capitán', Propietario: 'Maria Garcia', Telefono: '3515566778' },
        { NombreMascota: 'Luna', Propietario: 'Ana Rodriguez', Telefono: '3415544332' },
        { NombreMascota: 'Toto', Propietario: 'Carlos Lopez', Telefono: '1133445566' },
        { NombreMascota: 'Sol', Propietario: 'Ana Rodriguez', Telefono: '3415544332' },
        { NombreMascota: 'Toby', Propietario: 'Jose Fernandez', Telefono: '2216677889' },
        { NombreMascota: 'Lola', Propietario: 'Laura Diaz', Telefono: '1144556677' },
        { NombreMascota: 'Simon', Propietario: 'Laura Diaz', Telefono: '1144556677' },
        { NombreMascota: 'Mora', Propietario: 'Martin Martinez', Telefono: '3516677889' },
        { NombreMascota: 'Teo', Propietario: 'Martin Martinez', Telefono: '3516677889' },
        { NombreMascota: 'Coco', Propietario: 'Sofia Gonzalez', Telefono: '3415566778' },
        { NombreMascota: 'Nala', Propietario: 'Sofia Gonzalez', Telefono: '3415566778' },
        { NombreMascota: 'Zeus', Propietario: 'Pablo Sanchez', Telefono: '1155667788' },
        { NombreMascota: 'Kira', Propietario: 'Paula Ramirez', Telefono: '3517788990' },
        { NombreMascota: 'Romeo', Propietario: 'Paula Ramirez', Telefono: '3517788990' },
        { NombreMascota: 'Julieta', Propietario: 'Diego Torres', Telefono: '2217788990' },
        { NombreMascota: 'Dante', Propietario: 'Valeria Acosta', Telefono: '1166778899' },
        { NombreMascota: 'Frida', Propietario: 'Valeria Acosta', Telefono: '1166778899' },
        { NombreMascota: 'Astor', Propietario: 'Mateo Benitez', Telefono: '3518899001' },
        { NombreMascota: 'Milo', Propietario: 'Lucia Romero', Telefono: '3416677889' },
        { NombreMascota: 'Otto', Propietario: 'Agustin Gimenez', Telefono: '1177889900' },
        { NombreMascota: 'Ciro', Propietario: 'Renata Vega', Telefono: '3519900112' },
        { NombreMascota: 'Emma', Propietario: 'Manuel Castro', Telefono: '2218899001' },
        { NombreMascota: 'Sofía', Propietario: 'Victoria Herrera', Telefono: '1188990011' },
        { NombreMascota: 'Benjamín', Propietario: 'Facundo Silva', Telefono: '3510011223' },
        { NombreMascota: 'Olivia', Propietario: 'Emilia Rojas', Telefono: '3417788990' },
        { NombreMascota: 'Mateo', Propietario: 'Emilia Rojas', Telefono: '3417788990' },
    ]);
}

DBinit().then(() => {
    app.listen(3000, async() => console.log('servidor escuchando peticiones en http://localhost:3000'));
});