import bcrypt from 'bcrypt'
import connectDB from "./db/database.js"
import studentModel from './models/student.js'

// const register = async ()=>{
//     try {
//         connectDB();
//         const hashPassword = await bcrypt.hash("admin", 10);
//         const newstudent = new studentModel({
//             name: "admin",
//             email: "admin@gmail.com",
//             password: hashPassword,
//             role: "admin"
//         })
//         await newstudent.save();
//         console.log("admin user created successfully");
//     } catch (err) {
//         console.log("ERROR:", err);
//         return res.status(500).json(err);
//     }
// }
// register();
