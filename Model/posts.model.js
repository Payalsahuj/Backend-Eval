const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    title:String,
    body:String,
    device:{type:String,enum:["Laptop", "Tablet", "Mobile"],required:true},
    no_of_comments:Number,
    userID:String,
    name:String

},{
    versionKey:false
})

const postModel=mongoose.model("product",postSchema)

module.exports={
    postModel
}