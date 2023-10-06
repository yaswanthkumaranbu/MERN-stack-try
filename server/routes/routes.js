const express = require("express");
const Task = require("../model/model");

const router = express.Router();

router.post("/tasks/post",async (req,res)=>{
    try{
        const newItem = new Task(req.body);
        await newItem.save();
        res.json(newItem);
    }
    catch(error){
        res.json({message:error.message})
    }
});


router.get("/tasks/get",async(req,res)=>{
    try{
        const getItem = await Task.find();
      
        res.json(getItem);
    }
    catch(error){
        res.json({message:error.message})
    }
});

router.get("/tasks/get/:id",async(req,res)=>{
    try{
        const getItem = await Task.findById(req.params.id);
      
        res.json(getItem);
    }
    catch(error){
        res.json({message:error.message})
    }
});


router.put("/tasks/put/:id",async(req,res)=>{
    try{
        const updateItem = await Task.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
        });
      
        res.json(updateItem);
    }
    catch(error){
        res.json({message:error.message})
    }
});



router.delete("/tasks/delete/:id",async(req,res)=>{
    try{
        const deleteItem = await Task.findByIdAndRemove(req.params.id);
      
        res.json(deleteItem);
    }
    catch(error){
        res.json({message:error.message})
    }
});


 module.exports=router;