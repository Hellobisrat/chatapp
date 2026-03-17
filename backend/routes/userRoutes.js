import express from 'express'
import { sign } from 'jsonwebtoken';
import { protectRoute } from '../middleware/auth';
import { login,signup,updateProfile,checkAuth } from '../controllers/userController';


const userRouter =  express.Router();

userRouter.post('/signup',signup);
userRouter.post('/login',login);
userRouter.put('/update-profile',protectRoute,updateProfile);
userRouter.get('/check',protectRoute, checkAuth);


export default userRouter;