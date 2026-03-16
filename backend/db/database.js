import mongoose from "mongoose";

const connectDB = async () => {

    // other method for database connection
    // mongoose.connect("mongodb://localhost:27017/studentDB")
    // .then(()=> console.log("mongoDB connected"))
    // .catch(err => console.log(err));


    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDB connected`)
    } catch (err) {
        console.log("database connection failed", err);
        process.exit(1)
    }
}

// module.exports = connectDB();
export default connectDB;