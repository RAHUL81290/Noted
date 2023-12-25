const jwt=require('jsonwebtoken')
module.exports = (req, res,next) => {
  if(req.method==='OPTION')
  {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error("auth failed");
    }
    const decodedToken= jwt.verify(token,process.env.SECRET_KEY)
    req.userData={userId:decodedToken.userId}
    next();
  } catch(err){
    return res.status(401).json({message:"auth failed"})
  }
};