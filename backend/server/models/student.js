// import mongoose from "mongoose"
const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {type: String,
           required: true
        },
    email: {type: String, 
            required: true,
            unique: true
        },
    password: {type: String,
               required: true,
               minLength: 6,
            },
    role: {type: String,
           default: "student"

    }       
},

{
    timestamps: true
}
)

const studentModel = mongoose.model("student", studentSchema);
module.exports = studentModel;

// if we are using the module met
// export default studentModel