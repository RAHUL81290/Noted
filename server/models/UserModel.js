const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    googleId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    folders:[{type: mongoose.Types.ObjectId, required: true,ref:"Folder"}]
});
const User=mongoose.model("User",UserSchema);
module.exports=User;