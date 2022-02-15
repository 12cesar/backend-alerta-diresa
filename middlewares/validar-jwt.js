const {response, request} = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validarJWT =async (req= request, res = response, next)=>{ 
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const {id} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer el user

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(401).json({
                msg: 'Token no valido - user no existe en BD'
            })
        }
        // Verificar si el uid tiene estado en tru
        if (user.active === 0) {
            return res.status(401).json({
                msg: 'Token no valido - user con estado : false'
            })
        }
        req.userToken = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
    
    
}
module.exports = {
    validarJWT  
}