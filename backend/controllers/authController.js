import bcrypt from 'bcrypt';
import studentModel from "../models/student.js";
import teacherModel from "../models/teacher.js";
import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken';
import { jwttoken } from '../utils/jwttoken.js';
import generateOtp from "../utils/generateOtp.js";
import cookieparser from 'cookie-parser';
import { response } from 'express';

const login = async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);
    const { email, password, role } = req.body;
    if (role === 'student') {
      const user = await studentModel.findOne({ email: email });
      if (user) {
        const match = await bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign({ email: user.email, role: user.role },
              process.env.JWT_SECRET, { expiresIn: "1h" });
            // const token = jwttoken;
            res.cookie('token', token, {
              httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'lax'
            });
            return res.json({ status: "student login success", token: token, role });
          } else {
            return res.json("password is incorrect");
          }
        });
      } else {
        return res.json("record does not exisrt");
      }
    } else {
      const user = await teacherModel.findOne({ email: email });
      if (user) {
        const match = await bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign({ email: user.email, role: user.role },
              process.env.JWT_SECRET, { expiresIn: "1h" });
            // const token = jwttoken;
            res.cookie('token', token, {
              httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'lax'
            });
            return res.json({ status: "teacher login success", token: token, role });
          } else {
            return res.json("password is incorres");
          }
        });
      } else {
        return res.json("record does not exisrt");
      }
    }
  }
  catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json(err);
  }
}

const register = async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);
    const {
      fullName,
      email,
      password,
      role,
      phone,
      gender,
      dob,
      course,
      address,
      tenthPercentage,
      twelfthPercentage,
      idType,
    } = req.body;

    const hash = await bcrypt.hash(password, 10);
    try {
      if (role === 'student') {
        const student = await studentModel.create({
          fullName,
          email,
          password: hash,
          role,
          phone,
          gender,
          dob,
          course,
          address,
          tenthPercentage,
          twelfthPercentage,
          idType,

          // file paths
          tenthMarksheet: req.files.tenthMarksheet?.[0]?.filename,
          twelfthMarksheet: req.files.twelfthMarksheet?.[0]?.filename,
          transferCertificate: req.files.transferCertificate?.[0]?.filename,
          passportPhoto: req.files.passportPhoto?.[0]?.filename,
          idProof: req.files.idProof?.[0]?.filename,
        });
        return res.json({ status: "success" });
      } else {
        const teacher = await teacherModel.create({ fullName, email, password: hash });
        return res.json({ status: "success" });
      }
    } catch (err) {
      console.log("ERROR:", err);
      return res.status(500).json(err);
    }
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json(err);
  }
}

const newOtp = [];
const forgotPassword = async (req, res) => {

  try {
    console.log("Incoming Data:", req.body);
    const { email } = req.body;
    let user = await studentModel.findOne({ email: email });

    if (!user) {
      user = await teacherModel.findOne({ email: email });
    }

    if (!user) {
      return res.send({ status: "user does not exist" });
    }

    // otp generator
    // function generateotp() {
    //   let otp = "";
    //   for (let i = 0; i < 6; i++) {
    //     otp += Math.floor(Math.random() * 10);
    //   }
    //   return otp;
    // }
    const otp = generateOtp();
    newOtp.push(otp);

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
        return res.send({ status: "success" })
      }
    });

  } catch (err) {
    console.log("ERROR:", err)
    return res.status(500).json(err)
  }
}

const verifyOtp = async (req, res) => {
  try {
    const userOtp = await req.body.userOtp;
    if (!userOtp) {
      return res.json({ status: "otp did not entered" })
    } else if (userOtp === newOtp[newOtp.length - 1]) {
      return res.json({ status: "success" })
    } else {
      return res.json({ status: "incorrect otp" })
    }
  } catch (err) {
    console.log("ERROR:", err)
    return res.status(500).json(err)
  }
}

const logout = async (req, res) => {
  res.clearCookie("token");
  return res.json({ status: "logged out successfully" })
}

const resetPassword = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.json({ status: "email and password are needed" })
  }

  try {
    let user = await studentModel.findOne({ email: email });

    if (!user) {
      user = await teacherModel.findOne({ email: email });
    }

    if (!user) {
      return res.send({ status: "user does not exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    await user.save();

    return res.json({ status: "success" })
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

export { login, register, forgotPassword, verifyOtp, logout, resetPassword };