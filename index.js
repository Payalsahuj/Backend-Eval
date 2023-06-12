const express=require("express")
const app=express()
const { connection } = require("./db")
const { userRoute } = require("./Route/user.route")
const { postRoute } = require("./Route/posts.route")

require("dotenv").config()


app.use(express.json())

app.use("/users",userRoute)
app.use("/posts",postRoute)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to DB")
    }
    catch(err){
        console.log(err)
    }
    console.log(`server is running at ${process.env.port}`)
})