import jwt from 'jsonwebtoken'
import User from  '../Models/User.model.js'
import Bramhan from '../Models/Bramahn.model.js'
const secureRoute=async(req,res,next)=>{
        try { 
                const token=req.cookies.jwt;
                if(!token)
                {
                        return res.status(401).json({error:"No token invalid user"})
                }
                const decode=jwt.decode(token,process.env.JWT_TOKEN)
                if(!decode)
                {
                        return res.status(401).json({error:" invalid user"})
                }
                const user=await User.findById(decode.user_id).select("-password")
                const bramhan=await Bramhan.findById(decode.user_id).select("-password")
                if(!user && !bramhan)
                {
                        return res.status(401).json({error:"No user found"})
                }
                req.bramhan=bramhan
                req.user=user
                next();
        } catch (error) {
                console.log(error);
                res.status(401).json({error:"Internal server error"})
                
        }
}
export default secureRoute;