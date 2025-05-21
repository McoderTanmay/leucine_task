import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.SECRET;

const authToken = (req, res, next) =>{
    const authHeader = req.headers['authorization'];

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message: 'Access denied'});
    }

    const token = authHeader.split(' ')[1];

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

const authRoles = (...validRoles) =>{
    return (req, res, next)=>{
        const user = req.user.role;
        if(!user || !validRoles.includes(user)){
            return res.status(403).json({message: "Access denied"});
        }

        next();
    }
}

export { authToken, authRoles };