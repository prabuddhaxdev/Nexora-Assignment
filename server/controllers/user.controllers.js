const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users.models");

// REGISTER
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exists with this email! Please try again.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ userName, email, password: hashPassword });
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registration successful!",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred during registration.",
    });
  }
};

//LOGIN
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first.",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect password! Please try again.",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "JWT_SECRET",
      { expiresIn: "60m" }
    );


    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      token,
      user: {
        id: checkUser._id,
        email: checkUser.email,
        role: checkUser.role,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred during login.",
    });
  }
};

//LOGOUT

const logoutUser = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully!",
  });
};

//AUTH MIDDLEWARE
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user! Token missing.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "JWT_SECRET");
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "Unauthorized user! Invalid token.",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
