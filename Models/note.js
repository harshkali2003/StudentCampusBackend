const mongoose = require('mongoose');

let noteData = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    subject : {
        type : String,
        required : true,
    },
    fileUrl : {
        type : String,
        required : true,
    },
    uploadedBy : {
        type : String,
        required : true,
    }
});

module.exports = mongoose.model('allNotes' , noteData);