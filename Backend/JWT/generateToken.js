import jwt from 'jsonwebtoken'
export const createTokenAndSaveCookie=(user_id,res)=>{
        const token=jwt.sign({user_id},process.env.JWT_TOKEN,{
                expiresIn:"10d"
        });
        res.cookie("jwt",token,{
                httpOnly:true,
                secure:'production',
                sameSite:"strict"
        })        
}