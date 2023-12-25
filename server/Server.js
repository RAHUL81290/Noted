const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const User = require("./models/UserModel");
const UserRoutes=require('./routes/UserRoutes');
const FolderRoutes=require('./routes/FolderRoutes');
const NoteRoutes=require('./routes/NoteRoutes');
const Path=require('path');

require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use("/api/user",UserRoutes);
app.use("/api/folder",FolderRoutes);
app.use("/api/note",NoteRoutes);

app.use(express.static(Path.join(__dirname,"../client/build")));

app.get("*",function(req,res){
  res.sendFile(Path.join(__dirname,"../client/build/index.html"));
});

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

app.listen(process.env.PORT_SERVER, (req, res) => {
  console.log("server started");
});
