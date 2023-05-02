const express = require("express");
const {connection} = require("./config/db");
const {UserRouter} = require("./routes/user.route")
const {postRouter} = require("./routes/post.route")
const app = express();
const jwt = require("jsonwebtoken")
const {auth} = require("./middleware/auth.middleware")
const cors = require("cors")
require('dotenv').config()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Fullstack Social Media App")
})


app.use("/users",UserRouter)

app.use(auth)

app.use("/posts",postRouter)
app.listen(process.env.port,async()=>{
  try{
    await connection;
    console.log("Connected to DB")
  }catch(err){
    console.log(err)
    console.log("Cannot connected to DB")
  }
  console.log("server running at 8080")
})