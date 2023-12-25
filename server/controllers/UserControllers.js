const User = require("../models/UserModel");
const axios = require("axios");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const getUser=async(req,res)=>{
  const {googleId}=req.body;
  const user= await User.findOne({googleId:googleId}).populate("folders");
  res.json({user:user});
}

const login = async (req, res) => {
  const { accessToken } = req.body;
  const response = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + accessToken
  );
  const { sub, name, email, picture } = response.data;


  const userexist = await User.findOne({ googleId: sub });
  if (userexist) {
    const token = jwt.sign(
      {
        userId:userexist._id,
        googleId: sub,
        email: email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.json({ message: "user exist", user: userexist,token:token });
  }
  const newUser = new User({
    googleId: sub,
    name: name,
    email: email,
    picture: picture,
    folders: [],
  });
  await newUser.save();
  const token = jwt.sign(
    {
      userId:newUser._id,
      googleId: sub,
      email: email,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.json({ user: newUser,token:token});
};
exports.login = login;
exports.getUser=getUser;
