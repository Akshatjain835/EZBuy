import User from "../models/users.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


export const registerUserController = async (req, res) => {
    const { userName, email, password } = req.body;
  
    try {
      const checkUser = await User.findOne({ email });
    //   console.log(checkUser)
  
      if (checkUser)
        return res.status(400).json({
          message: "User Already exists with the same email! Please try again",
          success: false,
        });
  
      const salt = await bcrypt.genSalt(15);
      const hashPassword = await bcrypt.hash(password, salt);
    //   console.log(hashPassword)

  
      const newUser = new User({
        userName,
        email,
        password: hashPassword,
      });

  
      await newUser.save();
  
      res.status(200).json({
        success: true,
        message: "Registration successfull",
      });

    } catch (e) {

        // console.log(e)
      res.status(500).json({
        success: false,
        message: "Some error occured",
        error:true
      });
    }
  };
  