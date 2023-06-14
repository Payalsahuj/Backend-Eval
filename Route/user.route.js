const express=require("express")
const { userModel } = require("../Model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { blacklist } = require("../blacklist")
const userRoute=express.Router()


userRoute.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body
    
    try{
        const user=await userModel.findOne({email})
        if(user){
           res.status(200).json({msg:'User already exist'}) 
        }
        else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    res.status(200).json({error:err.message})
                }
                else{
                    const user=new userModel({name,email,gender,password:hash,age,city,is_married})
                    await user.save()
                    res.status(200).json({msg:'Registered'})
                }
              })
        }
        
    }
    catch(err){
        res.status(400).json({error:err.message})
    }

})

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await userModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userID:user._id,name:user.name},process.env.secode,{expiresIn:'7d'})
                    res.status(200).json({msg:"Logged in",token})
                }
                else{
                    res.status(200).json({error:"Wrong password"})
                }
            })
        }
    }
    catch(err){
        res.status(400).json({error:err.message})
    }  
})


userRoute.get("/logout",(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1]
    try{
        blacklist.push(token)
        res.status(200).json({msg:"User has been logged in"})
    }
    catch(err){
        res.status(400).json({error:err.message})
    }  
})

module.exports={
    userRoute
}


// {
//     "name":"payal",
//     "email":"sahupayal220@gmail.com",
//     "gender":"Female",
//     "password":"payal",
//     "age":23,
//     "city":"Raipur",
//     "is_married":false
//   }