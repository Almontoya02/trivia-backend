const jwt = require("jsonwebtoken")


const verifyToken =(req,res,next)=>{
    try{
        const token = req.headers["access-token"]
        const user = req.headers["user"]
        if(user==null){
            throw new Error("you must send a user")
        }
        if(token==null){
            throw new Error("you must send a token")
        }
        const userName=jwt.verify(token,process.env.AUTH_PASSWORD);
        console.log(userName._id)
        if(userName._id!=user){
            throw new Error("The Token is not real")
        }
        return next()
    }catch(error){
        return res.status(401).send(    {
            data:{error:error.toString()},
            status:false,
            message:"Authentication Error" 
        })
    }
}

module.exports = verifyToken