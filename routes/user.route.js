const express = require("express");

const {UserModel} = require("../models/User.model");

const UserRouter = express.Router();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

UserRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password} = req.body;
    try{
       bcrypt.hash(password,5,async(err,hash)=>{
        const user = new UserModel({name,email,gender,password:hash})
        await user.save()
        res.status(200).send({"msg":"New User added"})
       })
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

UserRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
       const user = await UserModel.findOne({email})
       if(user){
        bcrypt.compare(pass,user.pass,(err,result)=>{
            if(result){
                const token = jwt.sign({authorID:user._id,author:user.author})
                res.status(200).send({"msg":"Login Sucessfull"})
            }else{
                res.status(200).send({"msg":"Wrong Credential"})
            }
        })
       }else{
        res.status(200).send({"msg":"Wrong Credential"})
       }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})


module.exports = {UserRouter}