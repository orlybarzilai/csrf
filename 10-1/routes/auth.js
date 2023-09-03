const express=require('express');
const authController=require("../controllers/auth.js");
const router=express.Router();
router.get('/login',authController.getLogin);
router.post('/login',authController.postLogin);
router.get('/signup',authController.getSignUp);
router.post('/signup',authController.SignUp);
router.post('/logout',authController.postLogout);
module.exports=router;
