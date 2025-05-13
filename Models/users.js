const mongoose = require('mongoose');

let userData = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        default : "Guest"
    },
    email : {
        type : String,
        required : true,
        default : "Guest@gmail.com"
    },
    password : {
        type : String,
        required : true,
        default : "password"
    },
    role : {
        type : String,
        required : true,
    }
});

module.exports = mongoose.model('allUsers' , userData);