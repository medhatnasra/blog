const { UserModel } = require("../models/User");
const router = require("express").Router();
const Joi = require("joi");
var jwt = require("jsonwebtoken");

const {
  RegisterController,
  LoginController,
  LogoutController,
  verifyRefrechtoken,
} = require("../controllers/authControllers");

router.post("/register", RegisterController);
router.post("/logout", LogoutController);
router.post("/refreshtoken", verifyRefrechtoken);

router.post("/login", LoginController);
router.get("/auth/verify", (req, res) => {
  const token = req.cookies.accessToken;
  console.log("hzyy");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ user: decoded });
  } catch (err) {
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
});

module.exports = router;
