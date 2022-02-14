const { request, response } = require("express");
const { mayusPrimeraLetra } = require("../helpers");
const Area = require("../models/area");


const getArea = async (req=request, res=response) => {
    const {active} = req.query;
    const area = await Area.findAll({where:{
      active:Number(active)
    }});
    res.json({
      ok: true,
      area
    });
}

const postArea = async (req=request, res=response) => {
    const {titulo} = req.body;
    const area = await Area.create({
        title:mayusPrimeraLetra(titulo)
    })
    res.json({
      ok: true,
      area
    });
}

module.exports = {
    getArea,
    postArea
}