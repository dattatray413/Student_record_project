//another way of writting the backend code
// import express from "express"
// import mongoose from "mongoose"
// import cors from "cors"
// import studentModel from "./models/student.js"

const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')
const port = 3001 || 4000;
const studentModel = require('./models/student.js');
const connectDB = require('./models/database.js');
const nodemailer = require('nodemailer');
// const app = require("./app.js");
const app = express();
app.use(cors());
app.use(express.json());

const verifyOtp =[];

// previous old type of writting code
// app.post('/register', (req,res) =>{
//     studentModel.create(req.body)
//     .then(student=> res.json(student))
//     .catch(err=> res.status(500).json(err))
// });

// registeration 
app.post("/register", async (req, res) => {
    try {
        console.log("Incoming Data:", req.body);
        const {name, email, password}= req.body;
         const hash = await bcrypt.hash(password, 10)
         try{
         const student = await studentModel.create({name, email, password: hash})
         res.send({status: "success"});
       } catch (err) {
         console.log("ERROR:", err);
         res.status(500).json(err);
       }      
    } catch (err) {
        console.log("ERROR:", err);
        res.status(500).json(err);
    }
})

// login
app.post("/login", async (req, res) => {
    try {
        console.log("Incoming Data:", req.body);
        const { email, password } = req.body;
        const user = await studentModel.findOne({ email: email });
        if (user) {
            if (user.password === password) {
                res.json({status: "success"});
            } else {
                res.json({status: "password is incorrect"})
            }
        } else {
            res.json({status: "record does not exisrt"})
        }
    }
    catch (err) {
        console.log("ERROR:", err);
        res.status(500).json(err);
    }
})

//forgot password
app.post("/forgot-password", async (req, res) => {
    
    try {
        const {email} = req.body;
        const user = await studentModel.findOne({ email: email });
        if (!user) {
            return res.send({ status: "user does not exist" })
        }
        
        // otp generator
        function generateotp(){
            let otp ="";
            for(let i =0;i<6;i++){
               otp+=Math.floor(Math.random()*10);
            }
            return otp;
        }
        const otp = generateotp();
        verifyOtp.push(otp);

        // const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1d" })
        console.log("Sending email...");
        console.log(email);
        console.log("otp:", otp);
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dattatraykasle7@gmail.com',
                pass: 'tvztzvfgtkbxotbk'
            }
        });

        let mailOptions = {
            from: 'dattatraykasle7@gmail.com',
            to: email,
            subject: 'forgot password OTP',
            text: `your OTP is:${otp}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                return res.send({status: "success"})
            }
        });

    } catch (err) {
        console.log("ERROR:", err)
        res.status(500).json(err)
    }
})

app.post("/otp-verification", async (req, res) =>{
    try {
        const userOtp = await req.body.userOtp;
        if(!userOtp){
            res.json({status: "otp did not entered"})
        }else if(userOtp === verifyOtp[verifyOtp.length-1]){
            res.json({status: "success"})
        }else{
            res.json({status: "incorrect otp"})
        }
    } catch (err) {
        console.log("ERROR:", err)
        res.status(500).json(err)
    }
})

app.listen(port, () => {
    console.log(`server is running at port ${port}`)
});