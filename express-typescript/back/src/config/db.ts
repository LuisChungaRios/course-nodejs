import { config } from "dotenv";
import mongoose from "mongoose";

config();
console.log('MongoDB URL:', process.env.MONGO_URL);
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar MongoDB:", error);
    process.exit(1);
  }
};
