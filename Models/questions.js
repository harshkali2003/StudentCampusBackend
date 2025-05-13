const mongoose = require('mongoose');

let questionData = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    body : {
        type : String,
        required : true,
    },
    askedBy : {
        type : String,
        required : true,
    },
});

module.exports = mongoose.model('allQuestion' , questionData);