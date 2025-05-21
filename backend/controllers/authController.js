import { ServerDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepo = ServerDataSource.getRepository(User);
const JWT_SECRET = process.env.SECRET;

const signup = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        const hashedPassword = await bcrypt(password, 10);
        userRepo.create({username ,password: hashedPassword, role});

        await userRepo.save();
        res.status(201).json({message:"Successful"})
    } catch (error) {
        res.status(500).json({ code: 500, status: "failed", message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userRepo.findOneBy({username});

        if(!exist ){
            return res.status(401).json({message: "invalid username"});
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(401).json({message: "invalid password"});
        }

        const token = jwt.sign({id: user.id, username: user.username, role: user.role}, JWT_SECRET, {expiresIn: "24h"});

        res.status(201).json({message: "Login successsful", token, role: user.role});
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { signup, login };