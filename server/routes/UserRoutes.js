const express=require('express');
const router=express.Router();
const UserControllers=require('../controllers/UserControllers');

router.post("/",UserControllers.getUser);
router.post("/login",UserControllers.login);

module.exports=router;