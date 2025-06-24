import jwt from 'jsonwebtoken'

const tokenSign = async (usuario, rol) =>{
    const token = await jwt.sign({
        usuario: usuario,
        rol: rol
    }, "apisegura", {expiresIn: '2h'})

    return token
}

const verifyToken = async(tokenJWT) => {
    try{
        return jwt.verify(tokenJWT,"apisegura")
    }
    catch(error){
        return null
    }
    
}

export {tokenSign, verifyToken}