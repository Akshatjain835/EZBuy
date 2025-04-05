import {Router } from 'express'
import { loginUserController, logoutUserController, registerUserController } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const userRouter=Router();

userRouter.post('/register',registerUserController);
userRouter.post('/login',loginUserController);
userRouter.post('/logout',logoutUserController);
userRouter.get("/check-auth", isAuthenticated, (req, res) => {

    const user = req.user;
    
    res.status(200).json({
      success: true,
      message: "Authenticated user!",
      user,
    });

  });

export default userRouter