import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.DB_CONNECTION_URL);
        console.log("Base de datos conectada")
    } catch (error) {
        console.log("no se pudo conectar a la DB " + error)
    }
}

export default connectDB;