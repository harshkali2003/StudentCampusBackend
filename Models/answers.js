const mongoose = require('mongoose');

let answerData = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'allQuestion' 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('allAnswer', answerData);
