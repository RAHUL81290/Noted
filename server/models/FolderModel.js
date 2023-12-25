const mongoose = require("mongoose");

const FolderSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  notes:[{type:mongoose.Types.ObjectId,required:true,ref:"Note"}],
  creator:{type:mongoose.Types.ObjectId,required:true,ref:"User"},
  colour:{
    type:String,
    required:true
  }
});

const Folder = mongoose.model("Folder", FolderSchema);
module.exports = Folder;
