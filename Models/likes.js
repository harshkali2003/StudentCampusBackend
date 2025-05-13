const mongoose = require("mongoose");

let likesData = new mongoose.Schema({
   postId : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : "Post"
   },
   userId : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : "User"
   }
})

likesData.index({postId : 1 , userId : 1} , { unique : true });

module.exports = mongoose.model('Likes' , likesData);