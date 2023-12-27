const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const User = require("./models/UserModel");
const UserRoutes=require('./routes/UserRoutes');
const FolderRoutes=require('./routes/FolderRoutes');
const NoteRoutes=require('./routes/NoteRoutes');

require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use("/api/user",UserRoutes);
app.use("/api/folder",FolderRoutes);
app.use("/api/note",NoteRoutes);

mongoose
  .connect(
    process.env.DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

app.get("/check",(req,res)=>{
  const find=User.find();
  res.json({find});
})

app.listen(process.env.PORT_SERVER, (req, res) => {
  console.log("server started");
});
