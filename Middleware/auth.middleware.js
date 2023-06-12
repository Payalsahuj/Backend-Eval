const jwt=require("jsonwebtoken")
const { blacklist } = require("../blacklist")


const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(token){
        if(blacklist.includes(token)){
            res.status(200).json({msg:"Please Login first"})
        }
        try{
            const decoded=jwt.verify(token,process.env.secode)
            if(decoded){
                console.log(decoded)
                req.body.userID=decoded.userID
                req.body.name=decoded.name
                next()
            }
            else{
                res.status(200).json({msg:"Not authorized"})
            }
        }
        catch(err){
            res.status(400).json({error:err.message})
        }
    }
    else{
        res.status(200).json({msg:"Please login"})
    }
}

module.exports={
    auth
}