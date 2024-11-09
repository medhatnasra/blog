const Joi = require("joi"); // Validation library
const { UserModel } = require("../models/User"); // User schema/model
var jwt = require("jsonwebtoken"); // JSON Web Token for auth
var bcrypt = require("bcryptjs"); // Library for password hashing

/**---------------------------------
* @desc Register a New User in the System
* @route /api/user/
* @method POST 
* @access Public 
-----------------------------------**/
const RegisterController = async (req, res) => {
  const schema = RegValid(); // Generate Joi schema for validation
  const { error } = schema.validate(req.body); // Validate request body
  if (error) {
    // If validation fails, respond with error message
    return res.status(400).json({ message: error.details[0].message });
  } else {
    // Check if email is already registered
    let emailverif = await UserModel.findOne({ email: req.body.email });
    if (!emailverif) {
      // Generate hash for password with salt
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.password, salt);
      // Create new user object
      const user = new UserModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        bio: req.body.bio,
        password: hash,
      });
      await user.save(); // Save user to database

      res.status(201).json({ message: "User Registered Successfully" });
    } else {
      // If email already exists, return conflict message
      res.status(400).json({ message: "Email already Registered" });
    }
  }
};

/**---------------------------------
* @desc Authenticate and Login User
* @route /api/user/
* @method POST 
* @access Public 
-----------------------------------**/
const LoginController = async (req, res) => {
  const schema = LogValid(); // Generate Joi schema for validation
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  } else {
    // Check if email exists in the database
    const result = await UserModel.findOne({ email: req.body.email });
    if (!result) {
      return res.status(400).json({ message: "Email Or Password Invalid" });
    }
    // Compare provided password with stored hash
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      result.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Email Or Password Invalid" });
    }

    // Generate access and refresh tokens
    const accessToken = jwt.sign(
      { id: result._id, isAdmin: result.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "15m" } // Access token expires in 15 minutes
    );

    const refreshToken = jwt.sign(
      { id: result._id, isAdmin: result.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Refresh token expires in 7 days
    );

    // Set access and refresh tokens in HTTP-only cookies for security
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      user: {
        id: result.id,
        firstname: result.firstname,
        isAdmin: result.isAdmin,
      },
      message: "Logged in Successfully",
    });
  }
};

/**---------------------------------
* @desc Log out User by Clearing Auth Cookies
* @route /api/user/logout
* @method GET
* @access Public
-----------------------------------**/
const LogoutController = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.json({ message: "Logged out successfully" });
};

/**---------------------------------
* @desc Joi Schema for Register Validation
* @returns Joi schema object for registration data validation
-----------------------------------**/
const RegValid = () => {
  const schema = Joi.object({
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    lastname: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    bio: Joi.string().alphanum().min(3).max(250),
  });
  return schema;
};

/**---------------------------------
* @desc Joi Schema for Login Validation
* @returns Joi schema object for login data validation
-----------------------------------**/
const LogValid = () => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
  return schema;
};

/**---------------------------------
* @desc Refresh Access Token using Valid Refresh Token
* @route /api/user/refresh-token
* @method POST
* @access Private
-----------------------------------**/
const verifyRefrechtoken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(403).json({ message: "Refresh token not provided" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const newAccessToken = jwt.sign(
      { id: decoded.id, isAdmin: decoded.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "15m" } // New access token with 15-minute expiration
    );

    // Set the new access token as an HTTP-only cookie
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({
      user: {
        id: decoded.id,
        firstname: decoded.firstname,
        isAdmin: decoded.isAdmin,
      },
    });
  } catch (error) {
    return res.status(403).json({ message: "Refresh token expired" });
  }
};

// Export all controller functions
module.exports = {
  RegisterController,
  LoginController,
  RegValid,
  LogValid,
  LogoutController,
  verifyRefrechtoken,
};
