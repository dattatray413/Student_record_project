// import mongoose from "mongoose"
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    role: {
        type: String,
        required: true,
        default: "student"

    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },
    phone: String,
    gender: String,
    dob: String,
    course: String,
    address: String,
    tenthPercentage: String,
    twelfthPercentage: String,
    idType: String,

    //file path 
    tenthMarksheet: String,
    twelfthMarksheet: String,
    transferCertificate: String,
    passportPhoto: String,
    idProof: String,
},

    {
        timestamps: true
    }
)

const studentModel = mongoose.model("student", studentSchema);
// module.exports = studentModel;

// if we are using the module met
export default studentModel;