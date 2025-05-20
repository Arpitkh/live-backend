import express from 'express';
const router = express.Router();

import {loginController, signupController} from '../controllers/authController.js';

router.post('/login',loginController);
router.post('/signup',signupController);

export default router

