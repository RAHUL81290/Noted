const express=require('express');
const router=express.Router();

const FolderControllers=require('../controllers/FolderControllers');
const checkAuth=require('../middleware/Auth');

router.use(checkAuth);
router.post("/",FolderControllers.createFolder);
router.post("/getFolders",FolderControllers.getFolders);
router.post("/deleteFolder",FolderControllers.deleteFolder);

module.exports=router;