import studentModel from "../models/student.js";
import teacherModel from "../models/teacher.js";

const teacherDashboard = async (req, res) => {
    try {
        // req.teacher is set by verifyTeacher middleware
        console.log("req.teacher:", req.teacher);
        const teacher = await teacherModel.findOne({ email: req.teacher.email }).select("-password");
        if(teacher.role !== "teacher"){
            return res.json({status: "access denied"})
        }
        return res.json({ status: "success", teacher});
    } catch (err) {
        console.log("Dashboard error:", err.message);
        return res.status(500).json({ status: "server error" });
    }
}

const studentDashboard = async (req, res)=>{
    try {
        console.log("req.student:", req.student);
        const student = await studentModel.findOne({ email: req.student.email }).select("-password");
        if(student.role !== "student"){
            return res.json({status: "access denied"})
        }
        return res.json({ status: "success", student});
    } catch (err) {
        console.log("Dashboard error:", err.message);
        return res.status(500).json({ status: "server error" });
    }
}

export {teacherDashboard, studentDashboard };