import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';   

export const authMiddleware = async (req, res, next) => {
    const token = req.header('Auth');
    
    console.log("Auth Token:", token);
    if (!token) {
        return res.status(401).json({ message: 'Login First !' });
    }   
    const decoded = jwt .verify(token, process.env.JWT);
    const userId = decoded.id;
    console.log("User ID from Token:", userId);

    let user = await User.findById(userId);
    if (!user) {
        return res.status(401).json({ message: 'Invalid Token !' });
    }   
    console.log("Authenticated User:", user);

    req.user = user;
    next();
}