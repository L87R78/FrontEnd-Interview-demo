const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerUserSchema= new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
    },
    exam: { 
        type: Array, 
        required: true
    },
    countCorrectAnswers: { 
        type: Number, 
        required: true
    },
    stepQuastion: {
        type: Number, 
        required: true
    }

}, {
    timesTamps: true,
})

const registerUser = mongoose.model('regUsers', registerUserSchema);
module.exports = registerUser;