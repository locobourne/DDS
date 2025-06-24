import express, { Router } from "express";
import { Usuario } from '../models/usuarios.js'
import { tokenSign } from "../utils/jwt.js";


export const router = Router()

router.get('/', (req, res) => {
    res.json({ mensaje: 'API REST Segura' })
})

router.post('/login', async(req, res) => {
    const data = req.body
    const user = await Usuario.findOne({
        where: {
            email: data.email,
            clave: data.pass
        }
    })
   
    if(user){
        const token = await tokenSign(user.email, user.rol)
        const userToken ={
            id: user.id,
            token: token
        }
        res.json(userToken)
    }else{
        res.status(404).send({mensaje: 'Usuario y/o clave incorrectos!'})
    }
})