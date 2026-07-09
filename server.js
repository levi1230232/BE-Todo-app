import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";

import { connectDB } from "./lib/db.js";
import { swaggerSpec, swaggerUi } from "./config/swagger.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", routes);

const PORT = 3000;
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  connectDB();
});
