const { Router } = require("express");
const Post = require("../models/post");
const User = require("../models/user");


const router = Router();

router.get('/',async(req, res)=>{
    const post = await Post.findAll({
        include:[
            {
                model:User,
                attributes:['name','email','age']
            }
        ]
    });
    res.json({
        ok:true,
        post
    })
})
router.get('/:id',async(req, res)=>{
    const {id} = req.params;
    const post = await Post.findByPk(id);
    res.json({
        ok:true,
        post
    })
})

router.post('/',async(req, res)=>{
    const {title, body, userId} = req.body;
    const post = await Post.create({
        title,
        body,
        userId
    });
    res.json({
        ok:true,
        post
    })
})
router.put('/:id',async(req, res)=>{
    const {id} = req.params;
    const data = req.body;
    const post = await Post.update(data,{
        where:{
            id
        }
    })
    res.json({
        ok:true,
        post
    })
})
router.delete('/:id',async(req, res)=>{
    const {id} = req.params;
    const post = await Post.destroy({
        where:{
            id
        }
    })
    res.json({
        ok:true,
        post
    })
})



module.exports = router