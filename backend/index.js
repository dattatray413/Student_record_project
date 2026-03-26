import express from "express";
import cors from "cors";
import connectDB from "./db/database.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import path from 'path';
import { fileURLToPath } from 'url';
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
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server is running at port ${process.env.PORT}`)
    connectDB();
});