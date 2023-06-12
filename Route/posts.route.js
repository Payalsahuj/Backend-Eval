const express=require("express")
const { auth } = require("../Middleware/auth.middleware")
const { postModel } = require("../Model/posts.model")

const postRoute=express.Router()


postRoute.post("/add",auth,async(req,res)=>{
    try{
        const post=new postModel(req.body)
        await post.save()
        res.status(200).json({msg:"New note has been added",post:req.body})
    }
    catch(err){
        res.status(400).json({error:err.message})
    }  
})

postRoute.get("/",auth,async(req,res)=>{
    try{
        const posts=await postModel.find()
        res.status(200).json({msg:"All post getted",posts:posts})
    }
    catch(err){
        res.status(400).json({error:err.message})
    } 
})

postRoute.patch("/update/:postID",auth,async(req,res)=>{
    const {postID}=req.params
    
    try{
        const post=await postModel.findOne({_id:postID})
        if(post.userID==req.body.userID){
            await postModel.findByIdAndUpdate({_id:postID},req.body)
            res.status(200).json({msg:"details has been updated"})
        }
        else{
            res.json({msg:"Not Authorized"})
        }
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
})

postRoute.delete("/delete/:postID",auth,async(req,res)=>{
    const {postID}=req.params
    
    try{
        const post=await postModel.findOne({_id:postID})
        if(post.userID==req.body.userID){
            await postModel.findByIdAndDelete({_id:postID})
            res.status(200).json({msg:"details has been deleted"})
        }
        else{
            res.json({msg:"Not Authorized"})
        }
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
})


module.exports={
    postRoute
}
