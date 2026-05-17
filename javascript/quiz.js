let quizData = [];
let userAnswers = [];

// -------------------------
// LOAD QUIZ DATA
// -------------------------
async function loadQuiz() {
    try {
        const res = await fetch("/data/quiz.json");

        if (!res.ok) {
            throw new Error("Failed to load quiz.json");
        }

        quizData = await res.json();
        userAnswers = new Array(quizData.length).fill(null);

        renderQuiz();
    } catch (err) {
        console.error("Quiz load error:", err);
    }
}

// -------------------------
// RENDER QUIZ
// -------------------------
function renderQuiz() {
    const container = document.querySelector(".quiz-container");

    if (!container) {
        console.error("Missing .quiz-container in HTML");
        return;
    }

    container.innerHTML = "";

    quizData.forEach((q, questionIndex) => {
        const card = document.createElement("div");
        card.className = "question-card";

        const answersHTML = q.answers.map((answer, answerIndex) => {
            return `
                <button class="answer-btn" data-q="${questionIndex}" data-a="${answerIndex}">
                    ${answer}
                </button>
            `;
        }).join("");

        card.innerHTML = `
            <h2>Question ${questionIndex + 1}</h2>
            <p>${q.question}</p>
            <div class="answers">${answersHTML}</div>
        `;

        container.appendChild(card);
    });

    setupAnswerClicks();
}

// -------------------------
// ANSWER SELECTION
// -------------------------
function setupAnswerClicks() {
    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const qIndex = Number(btn.dataset.q);
            const aIndex = Number(btn.dataset.a);

            userAnswers[qIndex] = aIndex;

            // remove previous selection in same question
            document
                .querySelectorAll(`.answer-btn[data-q="${qIndex}"]`)
                .forEach(b => b.classList.remove("selected"));

            btn.classList.add("selected");
        });
    });
}

// -------------------------
// SUBMIT QUIZ
// -------------------------
function submitQuiz() {
    let score = 0;

    quizData.forEach((q, i) => {
        if (userAnswers[i] === q.correct) {
            score++;
        }
    });

    alert(`You scored ${score} / ${quizData.length}`);
}

// -------------------------
// INIT PAGE
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.querySelector(".quiz-submit-btn");

    if (submitBtn) {
        submitBtn.addEventListener("click", submitQuiz);
    }

    loadQuiz();
});