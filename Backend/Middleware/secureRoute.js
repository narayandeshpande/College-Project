import jwt from 'jsonwebtoken'
const secureRoute=async(req,res,next)=>{
        try { 
                const token=req.cookies.jwt;
                console.log(token)
                
                if(!token)
                {
                        return res.status(401).json({error:"No token invalid user"})
                }
                const decode=jwt.decode(token,process.env.JWT_TOKEN)
                if(!decode)
                {
                        return res.status(401).json({error:" invalid user"})
                }

                next();
        } catch (error) {
                console.log(error);
                res.status(401).json({error:"Internal server error"})
                
        }
}
export default secureRoute;