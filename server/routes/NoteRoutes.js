const express=require('express');
const router=express.Router();
const NoteControllers=require('../controllers/NoteControllers');
const checkAuth=require('../middleware/Auth');

router.use(checkAuth);
router.post("/getNotes",NoteControllers.getNoteByFolderId);
router.post("/newNote",NoteControllers.createNote);
router.post("/deleteNote",NoteControllers.deleteNote);
router.post("/getAllNotes",NoteControllers.fetchAllNotes);
router.put("/",NoteControllers.updateNote);
module.exports=router;