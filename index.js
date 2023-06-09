const questions = [];

//fetch API
fetch("question.json")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions);
    for (let i = 0; i < loadedQuestions.length; i++)
      questions[i] = loadedQuestions[i];
    start();
  })
  .catch((err) => {
    console.log(err);
  });

const title = document.getElementById("title");
const questionEl = document.getElementById("question");
const answerBtn = document.getElementById("answers-btn");
const nextBtn = document.getElementById("btn-next");

console.log(title);

let currQuesIndex = 0; //index hien tai trong mang questions
let score = 0; //diem cua nguoi choi
let timeStart, timeEnd;

function start() {
  currQuesIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  timeStart = new Date();
  console.log(timeStart);
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
  timeEnd = new Date();
  console.log(timeEnd);
  let timeTotal = (timeEnd - timeStart) / 1000;
  resetState();
  if (score > 1) {
    //score >= 2 -> pass
    questionEl.innerHTML = `Congratulation 🎉! You PASSED the quizz with time: ${timeTotal} seconds`;
  } else {
    questionEl.innerHTML = `Sorry 😢 You FAILED the quizz with time:  ${timeTotal} seconds`;
  }
  title.textContent = "Score: " + score + "/" + questions.length;
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
