const Folder = require("../models/FolderModel");
const Note = require("../models/NoteModel");
const User = require("../models/UserModel");

const getFolders=async(req,res)=>{
    const{creator}=req.body;
    const fetchFolders=await Folder.find({creator:creator});
    if(fetchFolders.creator.toString()!==req.userData.userId)
    {
        return res.status(401).json({message:"unauthorize"});
    }
    res.json(fetchFolders);
}

const createFolder=async(req,res)=>{
    const {text,creator,colour}=req.body;
    let validText;
    const ch=text.charAt(0);
    if(ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z")
    {
        validText=text.charAt(0).toUpperCase()+text.slice(1);
    }
    else{
        return res.json("first word cant be numeric");
    }
    const user=await User.findById(creator);
    if(user._id.toString()!==req.userData.userId)
    {
        return res.status(401).json({message:"unauthorize"});
    }
    if(!user){
        return res.json({message:"no user found"});
    }
    const folder=await Folder.findOne({text:validText});
    if(folder)
    {
        return res.status(404).json({message:"folder exist"});
    }
    const newFolder=new Folder({
        text:validText,
        notes:[],
        creator:creator,
        colour:colour
    });
    await newFolder.save();
    user.folders.push(newFolder);
    await user.save();
    res.json(newFolder);
}

const deleteFolder=async(req,res)=>{
    const{folderId}=req.body;
    const folder=await Folder.findById(folderId).populate("creator");
    const notes=await Note.find({folderId:folderId});
    if(folder.creator._id.toString()!==req.userData.userId)
    {
        return res.status(401).json({message:"unauthorize"});
    }
    if(!folder)
    {
        return res.json("error no folder found");
    }
    if(notes)
    {
        await Note.deleteMany({folderId:folderId});
    }
    await folder.deleteOne();
    folder.creator.folders.pull(folder);
    await folder.creator.save();
    res.json(folder);
}
exports.createFolder=createFolder;
exports.getFolders=getFolders;
exports.deleteFolder=deleteFolder;