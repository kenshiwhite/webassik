// script.js
const quizContainer = document.getElementById('quiz');

// Fetch quiz data from the server
async function fetchQuiz() {
    try {
        const response = await fetch('/api/quiz');
        const data = await response.json();
        if (data.success) {
            renderQuiz(data.data);
        } else {
            console.error('Failed to fetch quiz data:', data.error);
        }
    } catch (error) {
        console.error('Error fetching quiz data:', error);
    }
}

// Render quiz
function renderQuiz(quizData) {
    let quizHTML = '';
    quizData.forEach((quiz, index) => {
        // Render each quiz question using the quiz.ejs template
        quizHTML += `<%- include('quiz', { quiz: quiz, index: index }) %>`;
    });
    quizContainer.innerHTML = quizHTML;
}

// Submit quiz
function submitQuiz() {
    const userAnswers = Array.from(document.querySelectorAll('.options li:checked')).map(input => input.textContent);
    console.log(userAnswers);
    // Send userAnswers to backend for grading
}

// Event listener for submit button
document.getElementById('submit').addEventListener('click', submitQuiz);

// Fetch quiz data and render quiz on page load
window.addEventListener('load', fetchQuiz);
