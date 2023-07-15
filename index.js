import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import authRoutes from "./router/auth.js";
import profileRoutes from "./router/profileRoutes.js";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
// Enable CORS for all routes
app.use(cors());
// Routes
app.use("/api", authRoutes);
app.use("/api", profileRoutes);

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://somesh:123@cluster0.plixedp.mongodb.net/test=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
