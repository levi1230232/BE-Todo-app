import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";

import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/todos", todoRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  connectDB();
});
