const questions = [
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Creative Style Sheets", correct: false },
      { text: "Computer Style Sheets", correct: false },
      { text: "Colorful Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
    ],
  },

  {
    question: "Which HTML attribute is used to define inline styles?",
    answers: [
      { text: "style", correct: true },
      { text: "font", correct: false },
      { text: "class", correct: false },
      { text: "styles", correct: false },
    ],
  },

  {
    question: "Which property is used to change the background color?",
    answers: [
      { text: "bgcolor", correct: false },
      { text: "color", correct: false },
      { text: "background-color", correct: true },
      { text: "color-background", correct: false },
    ],
  },
];

const title = document.getElementById("title");
const questionEl = document.getElementById("question");
const answerBtn = document.getElementById("answers-btn");
const nextBtn = document.getElementById("btn-next");

console.log(title);

let currQuesIndex = 0; //index hien tai trong mang questions
let score = 0; //diem cua nguoi choi

function start() {
  currQuesIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currQues = questions[currQuesIndex];
  let quesNo = currQuesIndex + 1;
  title.textContent = "Question " + quesNo + "/" + questions.length;
  questionEl.innerHTML = quesNo + ". " + currQues.question;

  currQues.answers.forEach((answers) => {
    const button = document.createElement("button");
    button.innerHTML = answers.text;
    button.classList.add("btn-answer");
    answerBtn.appendChild(button);
    if (answers.correct) {
      button.dataset.correct = answers.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    // alert("Correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
    // alert("Oops! Incorrect");
  }
  Array.from(answerBtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
}

function showScore() {
  resetState();
  if (score > 1) {
    //score >= 2 -> pass
    questionEl.innerHTML = `Congratulation 🎉! You PASSED the quizz with score ${score} of ${questions.length}`;
  } else {
    questionEl.innerHTML = `Sorry 😢 You FAILED the quizz with score: ${score} of ${questions.length}`;
  }
  title.textContent = "Score: " + score;
  nextBtn.innerHTML = "Play again";
}

function handleNextBtn() {
  currQuesIndex++;
  if (currQuesIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currQuesIndex < questions.length) {
    handleNextBtn();
  } else {
    start();
  }
});

start();
