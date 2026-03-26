import express from 'express';
import { login, logout, resetPassword } from '../controllers/AuthController.js';
import { register } from '../controllers/AuthController.js';
import { forgotPassword } from '../controllers/AuthController.js';
import { verifyOtp } from '../controllers/AuthController.js';
import { verifyStudent, verifyTeacher } from '../middleware/authMiddleware.js';
import { studentDashboard, teacherDashboard } from '../controllers/userController.js';
import { getAllStudents, getPendingStudents, getStudentById, pendingCount, searchStudents, studentCount, updateStudentStatus } from '../controllers/teacherController.js';
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `uploads/`);
  },
  filename: (req, file, cb) => {
    const sanitized = file.originalname.replace(/\s+/g, "_");
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/otp-verification", verifyOtp);
router.get("/dashboard", verifyTeacher, teacherDashboard);
router.get("/student-dashboard", verifyStudent, studentDashboard);
router.get("/logout", logout);
router.post("/reset-password", resetPassword);
router.get("/pending-count", pendingCount);
router.get("/student-count", studentCount);
router.get("/pending-students", verifyTeacher, getPendingStudents);
router.get("/all-students", verifyTeacher, getAllStudents);
router.get("/student/:id", verifyTeacher, getStudentById);
router.patch("/student/:id/status", verifyTeacher, updateStudentStatus);
router.get("/search-students", verifyTeacher, searchStudents);
router.post(
    "/register",
    upload.fields([
        { name: "tenthMarksheet", maxCount: 1 },
        { name: "twelfthMarksheet", maxCount: 1 },
        { name: "transferCertificate", maxCount: 1 },
        { name: "passportPhoto", maxCount: 1 },
        { name: "idProof", maxCount: 1 },
    ]),
    register
);

export default router;