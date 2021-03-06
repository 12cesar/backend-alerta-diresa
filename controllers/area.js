const { request, response } = require("express");
const { mayusPrimeraLetra } = require("../helpers");
const Area = require("../models/area");

const getAreas = async (req = request, res = response) => {
  const { active } = req.query;
  try {
    const area = await Area.findAll({
      where: {
        active: Number(active),
      },
    });
    res.json({
      ok: true,
      area,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const getArea = async (req = request, res = response) => {
  const { id } = req.params;
  const area = await Area.findByPk(id);
  res.json({
    ok: true,
    area,
  });
};

const postArea = async (req = request, res = response) => {
  try {
    const { titulo } = req.body;
    const area = await Area.create({
      title: titulo.toUpperCase(),
    });
    res.json({
      ok: true,
      area,
    });
  } catch (error) {
    console.log(error);
  }
};

const putArea = async (req = request, res = response) => {
  const { id } = req.params;
  const { titulo } = req.body;
  const area = await Area.update(
    {
      title: mayusPrimeraLetra(titulo),
    },
    {
      where: {
        id,
      },
    }
  );
  res.json({
    ok: true,
    area,
  });
};

const deleteArea = async (req = request, res = response) => {
  const { id, active } = req.params;
  const area = await Area.update(
    { active },
    {
      where: {
        id,
      },
    }
  );
  res.json({
    ok: true,
    area,
  });
};

module.exports = {
  getAreas,
  getArea,
  postArea,
  putArea,
  deleteArea,
};
