const { request,response } = require("express");
const Alerta = require("../models/alerta");
const Soporte = require("../models/soporte");
const User = require("../models/user");
const sequelize = require("../db/dbMysql");
const { funDate } = require("../helpers/fc-fecha");

const getSoportes = async(req=request,res=response)=>{
    res.json({
        ok:true
    })
}

const postSoporte = async(req=request,res=response)=>{
   try {
    const {alerta,evaluacion, accion}= req.body;
    const {hora,fecha,ano,dia}= funDate();
    const {id} = req.userToken;
    const ales = await Alerta.findOne({
        where:{
            id:alerta
        }
    });
    if (ales.idUsuario !== id || ales.idUsuario === null) {
        return res.status(400).json({
            ok:true,
            msg:'A usted no le corresponde este soporte',
            soporte:null
        });
    }
    
    let data = {};
    data.evaluacion=evaluacion;
    data.accion=accion;
    data.idAlerta=Number(alerta);
    const soporte = await Soporte.create(data);
    const alertas = await Alerta.update({
        status:1
    },{
        where:{
            id:alerta
        }
    });
    const usuario = await User.update({
        atendiendo:0
    },{
        where:{
            id
        }
    });
    const sql = `select * from users where inicio<='${hora}' and fin>='${hora}' and active=1 and atendiendo=0 and semana like '%${dia}%' order by tiempo asc limit 1`;
    const user = await sequelize.query(sql);
    const alert = await Alerta.findOne({
        where:{
            status:0,
            idUsuario:null,
            fecha
        }
    });
    
    if (alert) {
        if (user[0].length !== 0) {
            const aler = await Alerta.update({
                idUsuario:user[0][0].id
            },{
                where:{
                    id:alert.id
                }
            });
            const users = await User.update(
                {
                    atendiendo:1,
                    tiempo:Number(user[0][0].tiempo)+1
                },{
                    where:{
                        id:user[0][0].id
                    }
                }
            )
        }else if (user[0].length === 0) {
            const aler = await Alerta.update({
                idUsuario:null
            },{
                where:{
                    id:alert.id
                }
            })
        }
    }

    res.json({
        ok:true,
        soporte
    })
   } catch (error) {
    res.status(400).json({
        ok:true,
        msg:`Error: ${error}`
    })  
   }
}




module.exports = {
    getSoportes,
    postSoporte
}