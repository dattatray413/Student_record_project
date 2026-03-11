const mongoose = require("mongoose");

const connectDB = async () => {

    // other method for database connection
    // mongoose.connect("mongodb://localhost:27017/studentDB")
    //.then(()=> console.log("mongoDB connected"))
    //.catch(err => console.log(err));


    try {
        const connectionInstance = await mongoose.connect("mongodb://localhost:27017/studentDB")
        console.log(`mongoDB connected ${connectionInstance}`)
    } catch (err) {
        console.log("database connection failed", err);
        process.exit(1)
    }
}

module.exports = connectDB();