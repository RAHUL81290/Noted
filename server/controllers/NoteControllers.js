const Folder = require("../models/FolderModel");
const Note = require("../models/NoteModel");
const User = require("../models/UserModel");


const getNoteByFolderId=async(req,res)=>{
    const {folderId}=req.body;
    const notes=await Folder.findById(folderId).populate("notes");
    if(notes.creator.toString()!==req.userData.userId)
    {
        return res.status(401).json({message:"unauthorize"});
    }
    if(!notes)
    {
        return res.json("error notes not fould");
    }
    res.json(notes);
}

const fetchAllNotes=async(req,res)=>{
const {creator}=req.body;
const notes=await Note.find({creator:creator});
if(!notes)
{
    return res.json("no notes found");
}
res.json(notes);
}

const createNote=async(req,res)=>{
    const{title,content,folderId,creator,colour}=req.body;
    let validTitle;
    const ch=title.charAt(0);
    if(ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z")
    {
        validTitle=title.charAt(0).toUpperCase()+title.slice(1);
    }
    else{
        return res.json("first word cant be numeric");
    }
    const folder=await Folder.findById(folderId);
    if(folder.creator.toString()!==req.userData.userId)
    {
        return res.status(401).json({message:"unauthorize"});
    }
    if(!folder){
        return res.json({message:"no folder found"});
    }
    const newNote=new Note({
        title:validTitle,
        content:content,
        folderId:folderId,
        creator:creator,
        colour:colour
    });
    await newNote.save();
    folder.notes.push(newNote);
    await folder.save();
    res.json(newNote);

}

const deleteNote=async(req,res)=>{
    const {noteId}=req.body;
    const note=await Note.findById(noteId).populate({path:'folderId',populate:{path:'notes'}});
    if(note.creator.toString()!==req.userData.userId)
    {
        return res.status(401).json({message:"unauthorize"});
    }
    if(!note)
    {
        return res.json("error no note found");
    }
    await note.deleteOne();
    note.folderId.notes.pull(note);
    await note.folderId.save();
    res.json(note);
}

const updateNote=async(req,res)=>{
    const {title,content,noteId}=req.body;
    const note=await Note.findById(noteId);
    if(note.creator.toString()!==req.userData.userId)
    {
        return res.status(401).json({message:"unauthorize"});
    }
    if(!note)
    {
        return res.json("note not found");
    }
    note.title=title;
    note.content=content;
    note.time=new Date();
    await note.save();
    res.json(note);
}

exports.getNoteByFolderId=getNoteByFolderId;
exports.createNote=createNote;
exports.deleteNote=deleteNote;
exports.fetchAllNotes=fetchAllNotes;
exports.updateNote=updateNote;