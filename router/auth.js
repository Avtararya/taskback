import express from "express";
import User from "../module/user.js";

const router = express.Router();

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    if (user.password !== password) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    // User exists and password is correct, return success response
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Registration
router.post("/register", async (req, res) => {
  const { name, email, password, mobileNumber } = req.body;
  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }
    // Create a new user
    const newUser = new User({ name, email, password, mobileNumber });
    await newUser.save();
    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// List users with pagination and search
router.get("/users", async (req, res) => {
  const { page = 1, limit = 10, name, email, mobileNumber } = req.query;
  const query = {};
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }
  if (email) {
    query.email = { $regex: email, $options: "i" };
  }
  if (mobileNumber) {
    query.mobileNumber = { $regex: mobileNumber, $options: "i" };
  }
  try {
    const users = await User.find(query)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    res.status(200).json(users);
  } catch (error) {
    console.error("List users error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Like/Dislike profile
router.post("/users/:userId/like", async (req, res) => {
  const { userId } = req.params;
  try {
    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Perform the like/dislike action
    // Add your logic here
    res.status(200).json({ message: "Like/Dislike successful" });
  } catch (error) {
    console.error("Like/Dislike error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
