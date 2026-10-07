const questions = [
    {
        question: "Как зовут снеговика из мультфильма «Холодное сердце»?",
        answers: ["Олаф", "Свен", "Кристофф", "Ханс"],
        correct: 0
    },

    {
        question: "Как зовут льва из «Короля Льва»?",
        answers: ["Шрам", "Муфаса", "Симба", "Тимон"],
        correct: 2
    },

    {
        question: "Кто лучший друг Шрека?",
        answers: ["Кот", "Осел", "Фиона", "Дракон"],
        correct: 1
    },

    {
        question: "Сколько игроков в одной футбольной команде на поле?",
        answers: ["9", "10", "11", "12"],
        correct: 2
    },

    {
        question: "В каком спорте забрасывают мяч в корзину?",
        answers: ["Футбол", "Баскетбол", "Хоккей", "Теннис"],
        correct: 1
    },

    {
        question: "Сколько олимпийских колец?",
        answers: ["4", "5", "6", "7"],
        correct: 1
    },

    {
        question: "В какой игре можно строить дома из блоков?",
        answers: ["Minecraft", "FIFA", "CS2", "Among Us"],
        correct: 0
    },

    {
        question: "Какая игра является королевской битвой от Epic Games?",
        answers: ["Roblox", "Minecraft", "Fortnite", "Terraria"],
        correct: 2
    },

    {
        question: "В какой игре есть бойцы и трофеи?",
        answers: ["Brawl Stars", "Minecraft", "GTA", "FIFA"],
        correct: 0
    },

    {
        question: "Как называется школа Гарри Поттера?",
        answers: ["Хогвартс", "Азкабан", "Нарния", "Хогсмид"],
        correct: 0
    },

    {
        question: "Как зовут железного супергероя Marvel?",
        answers: ["Тор", "Халк", "Железный человек", "Капитан Америка"],
        correct: 2
    },

    {
        question: "Как зовут главного героя «Человека-паука»?",
        answers: ["Питер Паркер", "Тони Старк", "Тор", "Стив Роджерс"],
        correct: 0
    },

    {
        question: "Сколько дней в неделе?",
        answers: ["5", "6", "7", "8"],
        correct: 2
    },

    {
        question: "Сколько месяцев в году?",
        answers: ["10", "11", "12", "13"],
        correct: 2
    },

    {
        question: "Столица Кыргызстана?",
        answers: ["Ош", "Бишкек", "Талас", "Нарын"],
        correct: 1
    },

    {
        question: "Сколько сторон у квадрата?",
        answers: ["3", "4", "5", "6"],
        correct: 1
    },

    {
        question: "Какая планета ближе всего к Солнцу?",
        answers: ["Земля", "Марс", "Меркурий", "Венера"],
        correct: 2
    },

    {
        question: "Как зовут мышонка Disney?",
        answers: ["Том", "Джерри", "Микки", "Дональд"],
        correct: 2
    },

    {
        question: "Как зовут главного героя мультфильма «Губка Боб»?",
        answers: ["Патрик", "Губка Боб", "Сквидвард", "Гэри"],
        correct: 1
    },

    {
        question: "Кто такой Пикачу?",
        answers: ["Покемон", "Человек", "Робот", "Монстр"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let time = 10;
let timer;

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const question = document.getElementById("question");
const answers = document.getElementById("answers");
const timerText = document.getElementById("timer");
const questionNumber = document.getElementById("questionNumber");
const progress = document.getElementById("progress");
const scoreText = document.getElementById("score");
const themeBtn = document.getElementById("themeBtn");

function startQuiz() {
    currentQuestion = 0;
    score = 0;

    document.getElementById("quiz").scrollIntoView({
        behavior: "smooth"
    });

    showQuestion();
}

function showQuestion() {

    clearInterval(timer);

    const q = questions[currentQuestion];

    question.textContent = q.question;

    questionNumber.textContent =
        `${currentQuestion + 1} / ${questions.length}`;

    scoreText.textContent =
        `Счёт: ${score}`;

    progress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    answers.innerHTML = "";

    nextBtn.style.display = "none";

    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer";

        button.textContent = answer;

        button.addEventListener("click", function () {
            checkAnswer(index, button);
        });

        answers.appendChild(button);
    });

    startTimer();
}

function startTimer() {

    time = 10;

    timerText.textContent = `⏱️ ${time}`;

    timer = setInterval(function () {

        time--;

        timerText.textContent = `⏱️ ${time}`;

        if (time <= 0) {

            clearInterval(timer);

            showCorrect();
        }

    }, 1000);
}

function checkAnswer(index, button) {

    clearInterval(timer);

    const correct =
        questions[currentQuestion].correct;

    const allButtons =
        document.querySelectorAll(".answer");

    allButtons.forEach(function (btn) {
        btn.disabled = true;
    });

    if (index === correct) {

        button.classList.add("correct");

        score++;

    } else {

        button.classList.add("wrong");

        allButtons[correct].classList.add("correct");
    }

    scoreText.textContent =
        `Счёт: ${score}`;

    nextBtn.style.display = "block";
}

function showCorrect() {

    const correct =
        questions[currentQuestion].correct;

    const allButtons =
        document.querySelectorAll(".answer");

    allButtons.forEach(function (btn) {
        btn.disabled = true;
    });

    allButtons[correct].classList.add("correct");

    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", function () {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        finishQuiz();
    }
});

function finishQuiz() {

    clearInterval(timer);

    question.textContent =
        "🎉 Викторина закончена!";

    answers.innerHTML = "";

    const percent =
        Math.round((score / questions.length) * 100);

    let message;

    if (percent >= 90) {
        message = "🔥 Невероятный результат!";
    } else if (percent >= 70) {
        message = "😎 Очень хорошо!";
    } else if (percent >= 50) {
        message = "👍 Неплохо!";
    } else {
        message = "📚 Попробуй ещё раз!";
    }

    answers.innerHTML = `
        <div class="result">

            <h2>🏆 ${score} / ${questions.length}</h2>

            <p>${percent}% правильных ответов</p>

            <h3>${message}</h3>

            <button class="restart" onclick="startQuiz()">
                🔄 Играть снова
            </button>

        </div>
    `;

    nextBtn.style.display = "none";
}

startBtn.addEventListener("click", startQuiz);

/* ТЕМА */

themeBtn.addEventListener("click", function () {

    if (document.body.style.background === "white") {

        document.body.style.background = "#0f172a";
        document.body.style.color = "white";

        themeBtn.textContent = "☀️";

    } else {

        document.body.style.background = "white";
        document.body.style.color = "#111827";

        themeBtn.textContent = "🌙";
    }

});