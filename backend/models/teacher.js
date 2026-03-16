import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
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
           required: true,
           default: "teacher"

    }       
},

{
    timestamps: true
}
)

const teacherModel = mongoose.model("teacher", teacherSchema);
// module.exports = teacherModel;
export default teacherModel