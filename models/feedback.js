const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedBackSchema= new Schema ({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    feedback: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }
}, {
    timesTamps: true,
})

const feedBack = mongoose.model('feedback', feedBackSchema);
module.exports = feedBack;