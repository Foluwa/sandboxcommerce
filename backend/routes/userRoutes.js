import express from "express";
import {
  authUser,
  registerUser,
  updateUserProfile,
  fetchProfile
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// @desc    POST Registration routes
router.route("/").post(registerUser);

// @desc    POST Authentication routes
router.post("/login", authUser);

// @desc    POST Update Profile routes
router.route("/profile").post(protect, updateUserProfile);

// @desc    GET Fetch User
router.get("/fetch", fetchProfile);

export default router;
