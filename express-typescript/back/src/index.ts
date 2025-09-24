import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import { connectDB } from "./config/db";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
