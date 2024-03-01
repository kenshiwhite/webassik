// models/quiz.js
const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: 'Country', // Set default category to 'Country'
    },
});

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;
