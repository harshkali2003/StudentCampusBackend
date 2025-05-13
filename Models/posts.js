const mongoose = require('mongoose');

let postData = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    filename : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true,
    },
    author : {
        type : String,
        required : true,
    },
    timeStamp : {
        type : Date,
        required : true,
        default : Date.now()
    }
});

module.exports = mongoose.model('allPost' , postData);