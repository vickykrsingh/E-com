import express from 'express';
import {loginController, registerController} from '../controllers/authControllers.js'
import { testController } from './../controllers/authControllers.js';
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';

const router = express.Router();
// Register Route
router.post('/register',registerController);
// Login Route
router.post('/login',loginController);
// Test Route for checking admin and user middleWare . Checking login person is admin or is user
router.get('/test',requireSignIn,isAdmin,testController);
// Protected Route
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(202).send({ok:true})
})


export default router;