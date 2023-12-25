const mongoose=require("mongoose");
const NoteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    folderId:{type:mongoose.Types.ObjectId,required:true,ref:"Folder"},
    creator:{type:mongoose.Types.ObjectId,required:true,ref:"User"},
    colour:{
        type:String,
        required:true
    },
    time:{
        type:Date,
        default:Date.now
    }
});
const Note=mongoose.model("Note",NoteSchema);
module.exports=Note;