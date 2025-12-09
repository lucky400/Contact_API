import {User} from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if(name == "" || email == "" || password == ""){
        return res.status(400).json({ message: "All fields are required" });
    }
    let user =  await User.findOne({ email });
    if(user){
        return res.status(400).json({ message: "User already exists", success : false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password : hashedPassword });

    res.json({
        message: "User registered successfully",
        user: { name, email, password : hashedPassword },
    });
}

export const login = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message : "All fields are required"});
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message : "User does not exist"});
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return res.status(400).json({message : "Invalid password"});
    }

    const token = jwt.sign({id : user._id}, process.env.JWT, {expiresIn : '1d'});

    res.json({
        message : "Login successful",
        user : {message:`Welcome ${user.name}`,token,id:user._id, email : user.email}
    });
}