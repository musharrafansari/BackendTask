const mongoose = require("mongoose")
require("dotenv").config()

const connectDb = async function () {
    try {
        const connectMongo = await mongoose.connect(process.env.MONGOURI, {
            useNewUrlParser: true,      
            useUnifiedTopology: true, 
        });
        console.log("MongoDB is connected...");
    } catch (error) {
        console.error("MongoDB connection error -->", error.message);
        process.exit(1)
    }
};

module.exports={
    connectDb
}