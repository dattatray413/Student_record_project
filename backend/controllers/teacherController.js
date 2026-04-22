import studentModel from "../models/student.js";

const studentCount = async (req, res)=>{
    try {
        const count = await studentModel.countDocuments();
        return res.json({status: "success", count})
        // return res.json({ status: "success", count: 0 });
    } catch (err) {
        return res.status(500).json({status: "error"})
    }
}

const pendingCount = async (req, res)=>{
    try {
        const count = await studentModel.countDocuments({status: "pending"});
        return res.json({status: "success", count})
        // return res.json({ status: "success", count: 0 });
    } catch (err) {
        return res.status(500).json({status: "error"})
    }
}

const getPendingStudents = async (req, res) => {
    try {
        console.log(req.body)
        const students = await studentModel.find(
            { status: "pending" },
            { password: 0 }).sort({ createdAt: -1 }
        );
        console.log("Pending students found:", students.length); // 👈 add this
        console.log(students);

        // group by course
        const groupedByCourse = students.reduce((acc, student) => {
            const course = student.course || "Uncategorized";
            if (!acc[course]) acc[course] = [];
            acc[course].push(student);
            return acc;
        }, {});

        return res.json({ status: "success", data: groupedByCourse });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "error" });
    }
};

const getAllStudents = async (req, res) => {
    try {
        const students = await studentModel.find({}, { password: 0 }).sort({ createdAt: -1 });

        const groupedByCourse = students.reduce((acc, student) => {
            const course = student.course || "Uncategorized";
            if (!acc[course]) acc[course] = [];
            acc[course].push(student);
            return acc;
        }, {});

        return res.json({ status: "success", data: groupedByCourse });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "error" });
    }
};

const getStudentById = async (req, res) => {
    try {
        const student = await studentModel.findById(req.params.id).select("-password");
        if (!student) return res.status(404).json({ status: "error", message: "student not found" });
        return res.json({ status: "success", data: student });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "error" });
    }
};

const updateStudentStatus = async (req, res) => {
    try {
        const { status } = req.body; // "verified" or "rejected"
        if (!["verified", "rejected"].includes(status)) {
            return res.status(400).json({ status: "error", message: "invalid status" });
        }
        const student = await studentModel.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).select("-password");
        if (!student) return res.status(404).json({ status: "error", message: "student not found" });
        return res.json({ status: "success", data: student });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "error" });
    }
};

const searchStudents = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ status: "error", message: "query is required" });

        const students = await studentModel.find({
            $or: [
                { fullName: { $regex: q, $options: "i" } },
                { email: { $regex: q, $options: "i" } },
                { course: { $regex: q, $options: "i" } },
                { phone: { $regex: q, $options: "i" } },
            ]
        }, { password: 0 }).sort({ createdAt: -1 });

        return res.json({ status: "success", data: students });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "error" });
    }
};

export { pendingCount, studentCount, getPendingStudents, getAllStudents, getStudentById, updateStudentStatus, searchStudents };
