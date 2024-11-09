const express = require("express");
const { UserModel } = require("../models/User");
const router = express.Router();
const {
  updateUserController,
  getUserController,
  uploadUserProfile,
  DeleteUserController,
  getSingleUserController,
} = require("../controllers/usercontrollers");
const {
  verifyTokenAndAdmin,
  verifyTokenAndOnlyUser,
  verifytoken,
} = require("../middlewares/verifyToken");
const photoUpload = require("../middlewares/uploadPhotos");

router.put("/profile/:id", verifyTokenAndOnlyUser, updateUserController);

router.get("/profile/:id", verifyTokenAndOnlyUser, getSingleUserController);

// router.delete("/profile/:id", verifyTokenAndAuth, DeleteUserController);

router.get("/profile", verifyTokenAndAdmin, getUserController);

router.post(
  "/profile/upload-photo",
  verifytoken,
  photoUpload.single("image"),
  uploadUserProfile
);

module.exports = router;
