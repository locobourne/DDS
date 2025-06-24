import { useInflection } from 'sequelize'
import * as utils from '../utils/jwt.js'

export const autorizar = async(req, res, next) =>{
    try {
        const tokenJwt = req.headers.authorization
        if (!tokenJwt) {
            res.status(401)
            res.send({ mensaje: 'Usuario no autorizado' })
        } else {
            const token = tokenJwt.split(' ').pop()
            const dataToken = await utils.verifyToken(token)

            if (!dataToken) {
                res.status(401)
                res.send({ mensaje: 'Token JWT inválido' })
            }else{
                next()
            }
        }

       

    } catch (error) {
        res.status(500).send({mensaje: 'Error interno. No se pudo autenticar con JWT'})
    }
}