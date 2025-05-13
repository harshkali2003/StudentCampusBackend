const app = require("./appImport");
const multer = require('multer');
const path = require('path');
const express = require('express')
const cors = require("cors");
app.use(cors());

const postData = require("../Models/posts");
const commentData = require("../Models/comment");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

  
const upload = multer({ storage });
app.use('/uploads', express.static('uploads'));


app.post("/user/content", upload.single('image'), async (req, resp) => {
  try {
    const { title, content, author, timeStamp } = req.body;
    if (!req.file) {
      return resp.status(400).send("No image file uploaded.");
    }

    const filename = req.file.filename; 
    const filepath = path.posix.join('./uploads/', filename);

    const data = new postData({
      title,
      content,
      author,
      timeStamp,
      filename: filepath,
    });

    const result = await data.save();
    console.log("Image details saved to database:", result);
    resp.send(result._id); 
  } catch (error) {
    console.error("Error saving post:", error);
    resp.status(500).send("Internal server error");
  }
});


app.get("/fetched/post", async (req, resp) => {
  let data = await postData.find({ filename: { $exists: true } });
  if (data) {
    console.log("Post Fetched");
    resp.send(data);
  }
});

app.put('/edit/:id' , async (req , resp) =>{
  let data = await postData.updateOne({_id : req.params.id} , {$set : req.body})
  if(data){
    console.log("Edited");
    resp.send(data);
  }else{
    resp.status(304).send("error")
  }
})

app.delete('/remove/:id' , async (req , resp) =>{
  let data = await postData.deleteOne({_id : req.params.id})
  if(data){
    console.log("Deleted");
    resp.send(data);
  }else{
    resp.status(304).send("error")
  }
})

app.post("/created/comment", async (req, res) => {
  try {
    const { postId, comment } = req.body;

    const data = new commentData({ postId, comment });
    const result = await data.save();

    console.log("Comment created");
    res.send(result);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(400).send("error");
  }
});

app.get("/fetched/comment", async (req, resp) => {
  let data = await commentData.find();
  if (data) {
    console.log("comment fetched successfully");
    resp.send(data);
  } else {
    resp.status(400).send("error");
  }
});

app.put('/comment/edit/:id' , async (req , resp) =>{
  let data = await commentData.updateOne({_id : req.params.id} , {$set : req.body})
   if(data){
    console.log("Edited");
    resp.send(data);
  }else{
    resp.status(304).send("error")
  }
})

app.delete('/comment/delete/:id' , async (req , resp) =>{
  let data = await commentData.deleteOne({_id : req.params.id})
   if(data){
    console.log("Comment deleted");
    resp.send(data);
  }else{
    resp.status(304).send("error")
  }
})

