const express = require('express');
const router = express.Router();
const Item = require("../models/itemSchema");
const authorisation = require("../middlewares/authorisation");

router.get('/allItems',async(req,res)=>{
    const data=await Item.find({});
    res.send(data);
})

router.get('/userItems/:id',authorisation,async(req,res)=>{
    const data=await Item.find({SellerID: req.params.id}).exec();
    res.send(data);
})

router.post('/addItem',authorisation,async (req,res)=>{

    const item = new Item({
        SellerID: req.body.SellerID,
        Title: req.body.Title,
        Description: req.body.Description,
        Price: req.body.Price,
        Image: req.body.Image
    });

    await item.save()
    .then(data => {
        res.json({data:data ,check:true});
        
    })
    .catch(err => {
        console.log(err);
    }) 
});

router.delete('/deleteItem/:id',authorisation,async (req,res)=>{
    const item = await Item.findById(req.params.id);
    if(!item){
        return res.status(401).json("Not Found");
    }

    try{
        const deleteItem = await Item.findByIdAndDelete(req.params.id);
        res.json(deleteItem);
    }catch(err){
        res.send(err);
    }
});


module.exports = router;