import express from "express";
import { Blogs } from "./model.js";
import fs from 'fs'
//npm i react-router-dom
const router =express.Router();

import multer from "multer";
//get all
router.get('/',async(req,res)=>{
    try{
        const blog =await Blogs.find().sort({timestamps:-1})
        return res.status(200).json({
            amout:blog.length,
            data:blog
        })
    }catch(err){
        response.status(500).send({message:err.message})
    }
})

//get 1
router.get('/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const blog =await Blogs.findById(req.params.id)
        return res.status(200).json(blog)
    }catch(err){
        res.status(500).send({message:err.message})
    }
})

//save new
const upload= multer({dest:'upload'})
router.post('/upload', upload.single("file"), async(req, res) => {
    if(!req.body.title||
        !req.body.text||
        !req.body.author){
            return(
                null
            )
        }

    const {originalname, path}=req.file
    const part=originalname.split('.')
    const ext=part[part.length-1]
    const newPath=path+'.'+ext
    fs.renameSync(path,newPath)
        
    try {
        const {title, text, author, content}=req.body
        Blogs.create({
            title,
            text,
            author,
            thumbnail : newPath,
            content,
        })
        res.status(200).json({files:req.file})
    }catch (err) {
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
});
//edit
router.put('/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const result=await Blogs.findByIdAndUpdate(id,req.body)
        if(result==undefined){
            return res.status(404).json({message:'no blog like that'})
        }
        return res.status(200).json({message:"updated blog"}, req.body)
    }catch(err){
        res.status(500).send({message:err.message})
    }
})
//del 1
router.delete('/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const result=await Blogs.findByIdAndDelete(req.params.id, req.body)
        if(result===undefined){
            return res.status(404).json({message:'no blog like that'})
        }
        return res.status(200).json({message:"updated blog"})
    }catch(err){
        res.status(500).send({message:err.message})
    }
})

export default router;