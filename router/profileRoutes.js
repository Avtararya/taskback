import express from "express";
import User from "../module/user.js";
import Profile from "../module/profile.js";

const router = express.Router();

router.post("/users/:userId/like", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let profile = await Profile.findOne({ userId: userId });

    if (!profile) {
      // If profile doesn't exist, create a new one
      profile = new Profile({ userId: userId });
    }

    // Add the logic to perform the like operation on the profile object
    profile.likes.push(user._id);

    // Save the profile
    await profile.save();

    res.json({ message: "User liked successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/users/:userId/dislike", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let profile = await Profile.findOne({ userId: userId });

    if (!profile) {
      // If profile doesn't exist, create a new one
      profile = new Profile({ userId: userId });
    }

    // Add the logic to perform the dislike operation on the profile object
    profile.likes = profile.likes.filter(
      (id) => id.toString() !== user._id.toString()
    );

    // Save the profile
    await profile.save();

    res.json({ message: "User disliked successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
