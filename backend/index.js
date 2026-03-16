import express from "express";
import cors from "cors";
import connectDB from "./db/database.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
dotenv.config();
//another way of writting the backend code of commonJS
// const express = require("express");
// const cors = require("cors");
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const cookieparser = require('cookie-parser')

// const studentModel = require('./models/student.js');
// const teacherModel = require('./models/teacher.js')
// const connectDB = require('./db/database.js');
// const nodemailer = require('nodemailer');
// const app = require("./app.js");
const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server is running at port ${process.env.PORT}`)
    connectDB();
});