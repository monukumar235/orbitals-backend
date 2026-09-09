import jwt from "jsonwebtoken";



export const authorized = (req,res,next)=>{
    try {
        const token = req.headers.authorization;

        if(!token){
            return res.status(401).json({
                success : false,
                message : "Authorization token is required."
            });
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({
            success : false,
            message : "Invalid or expire token",
            error : error.message
        });
    }
}
