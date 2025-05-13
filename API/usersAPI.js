const app = require('./appImport');
const cors = require("cors");
const mongoose = require('mongoose')

const users = require('../Models/users');

app.post('/user/register' , async (req , resp) =>{
let data = await users(req.body);
let result = await data.save();
if(result){
    console.log("New User has been created");
    resp.send(result);
}else{
    resp.status(400).send("error");
}
})

app.post('/user/log' , async (req , resp) =>{
    if(req.body.email && req.body.password){
        let data = await users.findOne(req.body);
        if(data){
            console.log("User has been found");
            resp.send(data);
        }else{
            resp.status(400).send("No user found");
        }
    }else{
        resp.status(304).send("Provide both email and password");
    }
})

app.put('/user/edit/:id', async (req, resp) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id); 

    await users.updateOne({ _id: userId }, { $set: req.body });

    const updatedUser = await users.findOne({ _id: userId });

    resp.send(updatedUser); 
  } catch (error) {
    console.error("Update failed:", error);
    resp.status(500).send("Error updating user");
  }
});




app.delete('/user/remove/:id' , async (req , resp) => {
    let data = await users.deleteOne({_id : req.params.id})
    if(data){
        console.log("User has been Deleted");
        resp.send(data);
    }else{
        resp.status(304).send("Error")
    }
})

app.get('/api/users' , async (req , resp) => {
    let data = await users.find();
    if(data){
        console.log("Got Details");
        resp.send(data)
    }else{
        resp.status(400).send("error")
    }
})