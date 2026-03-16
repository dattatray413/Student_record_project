import jwt from "jsonwebtoken";
import cookieparser from 'cookie-parser';


const verifyTeacher = async (req, res, next) => {
    const token = await req.cookies.token;

    if (!token) {
        return res.status(401).json("token is missing");
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                return res.json("error with token");
            } else {
                if(decoded.role === "teacher"){
                    req.teacher = decoded;
                    next();
                } else {
                    return res.json("not a teacher");
                }
            }
        });
    } catch (error) {
       return res.status(400).json("Invalid token");
    }
}

const verifyStudent = async (req, res, next) => {
    const token = await req.cookies.token;

    if (!token) {
        return res.status(401).json("token is missing");
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                return res.json("error with token");
            } else {
                if(decoded.role === "student"){
                    req.student = decoded;
                    next();
                } else {
                    return res.json("not a student");
                }
            }
        });
    } catch (error) {
       return res.status(400).json("Invalid token");
    }
}

export {verifyTeacher, verifyStudent};