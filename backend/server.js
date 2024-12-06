import express from "express";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import Routes from "./routes/routes.form.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Mongodb"))
  .catch((err) => console.error("Error connecting to the MongoDB", err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is connected to PORT ----${PORT}`);
});

Routes(app);
