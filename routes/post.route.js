const express = require("express");

const {PostModel} = require('../models/post.model')
const postRouter = express.Router()

postRouter.get("/",async(req,res)=>{
    try{
        const post = await PostModel.find({authorID:req.body.authorID})
        res.send(post)
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

postRouter.patch("/update/:postID",async(req,res)=>{
    const {postID} = req.params
    const post = new PostModel.findOne({_id:postID})
    try{
        if(req.body.authorID !== post.authorID){
            res.status(200).send({"msg":"You not authorised"})
        }else{
            await PostModel.findByIdAndUpdate({_id:postID},req.body)
            res.status(200).send({"msg":"post updated"})
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

postRouter.delete("/delete/:postID",async(req,res)=>{
    const {postID} = req.params
    const post = new PostModel.findOne({_id:postID})
    try{
        if(req.body.authorID !== post.authorID){
            res.status(200).send({"msg":"You not authorised"})
        }else{
            await PostModel.findByIdAndDelete({_id:postID})
            res.status(200).send({"msg":"post deleted"})
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports = {postRouter}