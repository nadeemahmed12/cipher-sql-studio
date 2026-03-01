import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectMongo from "./config/mongo.js";
await connectMongo();
import assignmentRoutes from "./routes/assignmentRoutes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/cipherstudio",assignmentRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});