import express from 'express';
import { login, logout, resetPassword } from '../controllers/AuthController.js';
import { register } from '../controllers/AuthController.js';
import { forgotPassword } from '../controllers/AuthController.js';
import { verifyOtp } from '../controllers/AuthController.js';
import { verifyStudent, verifyTeacher } from '../middleware/authMiddleware.js';
import { studentDashboard, teacherDashboard } from '../controllers/userController.js';


const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/forgot-password", forgotPassword);
router.post("/otp-verification", verifyOtp);
router.get("/dashboard", verifyTeacher, teacherDashboard);
router.get("/student-dashboard", verifyStudent, studentDashboard);
router.get("/logout",logout);
router.post("/reset-password", resetPassword)

export default router;