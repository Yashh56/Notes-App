import jsonwebtoken from 'jsonwebtoken';

const jwt = jsonwebtoken;
export const JWT_SECRET = 'zoro';



export const verifyToken = (req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json('You need to Login')
    }
    jwt.verify(token,JWT_SECRET,async(err,data)=>{
        if(err){
            return res.status(403).json('Token is not valid !!')
        }
        req.userId = data.id
        // console.log("passed")
        next()
    })
}