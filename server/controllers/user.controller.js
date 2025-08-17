import User from "../models/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";



export const registerUserController = async (req, res) => {
  const { userName, email, password } = req.body;

  // Basic validation
  if (!userName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields (userName, email, password) are required.",
    });
  }

  try {
    let checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(409).json({
        message: "User already exists with the same email! Please try again.",
        success: false,
      });
    }

    checkUser = await User.findOne({ userName });
    if (checkUser) {
      return res.status(409).json({
        message: "User Name already exists!! Please try different username.",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
      error: e.message,
    });
  }
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );

    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    // res.cookie("token", token, { httpOnly: true, secure: true }).json({
    //   success: true,
    //   message: "Logged in successfully",
    //   user: {
    //     email: checkUser.email,
    //     role: checkUser.role,
    //     id: checkUser._id,
    //     userName: checkUser.userName,
    //   },
    // });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    // console.log(e);

    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

export const logoutUserController = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};
