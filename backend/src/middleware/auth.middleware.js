import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        // console.log("Token from cookie:", token);

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - No token provided' });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY); 
        // console.log("Decoded token:", decode);

        if (!decode) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }

        const user = await User.findById(decode.userId || decode.UserId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized - User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in auth middleware:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
