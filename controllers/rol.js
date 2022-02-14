const { request, response } = require("express");
const Rol = require("../models/rol");


const getRols = async(req=request,res = response)=>{
    const {active} = req.query;
    const rol = await Rol.findAll({where:{
        active:Number(active)
    }});
    res.json({
        ok:true,
        rol
    })
}
const getRol = async(req=request,res = response)=>{
    const {id}= req.params;
    const rol = await Rol.findByPk(id);
    res.json({
        ok:true,
        rol
    })
}
const postRol = async(req=request,res = response)=>{
    const {role} = req.body
    const rol = await Rol.create({
        role
    });
    res.json({
        ok:true,
        rol
    })
}
const putRol = async(req=request,res = response)=>{
    const {id}= req.params;
    const {role} = req.body;
    const rol = await Rol.update({
        role
    },{where:{
        id
    }})
    res.json({
        ok:true,
        rol
    })
}
const deleteRol = async(req=request,res = response)=>{
    const {id,active}= req.params;
    const rol = await Rol.update({
        active
    },{
        where:{
            id
        }
    });
    res.json({
        ok:true,
        rol
    })
}
module.exports = {
    getRols,
    getRol,
    postRol,
    putRol,
    deleteRol
}