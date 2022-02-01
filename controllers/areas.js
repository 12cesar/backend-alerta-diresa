const { request, response } = require("express")
const {Area} = require('../models');

const getAreas = async(req=request, res=response)=>{
    const area = await Area.find();
    res.json({
        ok:true,
        msg:'Areas mostrado con exito',
        area
    })
}
const getArea = async(req=request, res=response)=>{
    const {id} = req.params;
    const area = await Area.findById(id);
    res.json({
        ok:true,
        msg:'Area mostrado con exito',
        area
    })
}
const postArea = async(req=request, res=response)=>{
    const {nombre, ...data} = req.body;
    data.nombre = nombre.toUpperCase();
    const area = new Area(data);
    await area.save();
    res.json({
        ok:true,
        msg:'Area creado con exito',
        area
    })
}
const putArea = async(req=request, res=response)=>{
    const {id} = req.params;
    const {nombre, ...data} = req.body;
    data.nombre = nombre.toUpperCase();
    const area = await Area.findByIdAndUpdate(id, data, {new:true})
    res.json({
        ok:true,
        msg:'Area editado con exito',
        area
    })
}
const deleteArea = async(req=request, res=response)=>{
    const {id} = req.params;
    const area = await Area.findByIdAndRemove(id)
    res.json({
        ok:true,
        area
    })
}

module.exports = {
    getAreas,
    getArea,
    postArea,
    putArea,
    deleteArea
}