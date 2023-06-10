const questions = [];

//fetch API
fetch("https://opentdb.com/api.php?amount=5")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions.results);
    for (var i = 0; i < loadedQuestions.results.length; i++) {
      questions[i] = loadedQuestions.results[i];
    }
    start();
  })
  .catch((err) => {
    console.log(err);
  });

//DOM
const title = document.getElementById("title");
const questionEl = document.getElementById("question");
const answerBtn = document.getElementById("answers-btn");
const nextBtn = document.getElementById("btn-next");

let currQuesIndex = 0; //index hien tai trong mang questions
let score = 0; //diem cua nguoi choi
let timeStart, timeEnd;

//tao mang chua cac cau tra loi
let listAnswerDB = [];
let listAnswers = [];

//nguoi choi bat dau
function start() {
  currQuesIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  //bat dau tinh thoi gian
  timeStart = new Date();
  console.log("Start at: " + timeStart);
  showQuestion();
}

function showQuestion() {
  resetState();

  //hien thi cau hoi
  let currQues = questions[currQuesIndex];
  let quesNo = currQuesIndex + 1;
  title.textContent = "Question " + quesNo + "/" + questions.length;
  questionEl.innerHTML = quesNo + ". " + currQues.question;
  //chuan bi cau tra loi
  listAnswerDB.push(currQues.correct_answer);
  for (let i = 0; i < currQues.incorrect_answers.length; i++) {
    listAnswerDB.push(currQues.incorrect_answers[i]);
  }

  //xao tron mang chua cac cau tra loi
  function shuffle(array) {
    var ctr = array.length,
      temp,
      index;
    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = array[ctr];
      array[ctr] = array[index];
      array[index] = temp;
    }
    return array;
  }

  listAnswers = shuffle(listAnswerDB);
  console.log("Shuffled: " + listAnswers);

  listAnswers.forEach((element) => {
    const button = document.createElement("button");
    button.innerHTML = element;
    button.classList.add("btn-answer");
    answerBtn.appendChild(button);
    // console.log(element === currQues.correct_answer);
    if (element === currQues.correct_answer) {
      button.dataset.correct_answer = currQues.correct_answer;
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

  const isCorrect =
    selectBtn.dataset.correct_answer ===
    questions[currQuesIndex].correct_answer;

  console.log(isCorrect);
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
  console.log("End at: " + timeEnd);
  let timeTotal = (timeEnd - timeStart) / 1000;
  resetState();
  if (score > 2) {
    //score >= 3 -> pass
    questionEl.innerHTML = `Congratulation 🎉! You PASSED the quizz with time: ${timeTotal} seconds`;
  } else {
    questionEl.innerHTML = `Sorry 😢 You FAILED the quizz with time:  ${timeTotal} seconds`;
  }
  title.textContent = "Score: " + score + "/" + questions.length;
  nextBtn.innerHTML = "Play again";
}

function handleNextBtn() {
  currQuesIndex++;
  for (let i = 0; i < questions.length; i++) {
    listAnswerDB.pop();
  }
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
