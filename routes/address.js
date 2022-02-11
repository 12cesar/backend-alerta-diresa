const { Router } = require("express");
const Address = require("../models/address");
const User = require("../models/user");

const router = Router();

router.get('/',async(req,res)=>{
    const address = await Address.findAll({
        include:{
            model:User,
            attributes:['name', 'email','age','Id']
        },
        where:{
            id:2
        }
    });
    res.json({
        ok:true,
        address
    })
})
router.post('/',async(req,res)=>{
    const {street, userId} = req.body;
    const address = await Address.create({
        street,
        userId
    });
    res.json({
        ok:true,
        address
    })
})


module.exports = router