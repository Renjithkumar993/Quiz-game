var score = 0;

var timeInterval;

// this creates the timer on the right side //
var timeEl = document.querySelector(".time");


var secondsLeft = 60;

function setTime() {
  timeInterval = setInterval(() => {
    if ( secondsLeft > 0){
    secondsLeft--;
    timeEl.textContent = "Time :" + " " + secondsLeft;
    }

    if (secondsLeft === 0) {
      clearInterval(timeInterval);
      
    }
      
  }, 1000);
 
}


// sample questions//

questionsForQuiz = [{
  Q: "Javascript is an _______ language?",
  A: "Object-Oriented",
  choices: ["Object-Based", "Object-Oriented", "Procedural", "None of the above"]
},
{
  Q: "Which one of the following also known as Conditional Expression:",
  A: "immediate if",
  choices: [" Alternative to if-else", "Switch statement", "If-then-else statement", " immediate if"]
}, {
  Q: "In JavaScript, what is a block of statement?",
  A: "block that combines a number of statements into a single compound statement",
  choices: ["Conditional block", "block that combines a number of statements into a single compound statement", "both conditional block and a single statement", "block that contains a single statement"]
},
{
  Q: "Which one of the following is the correct way for calling the JavaScript code?",
  A: "Function/Method",
  choices: ["Preprocessor", "Triggering Event", "RMI", "Function/Method"]
},

{
  Q: "Which of the following type of a variable is volatile?",
  A: "Volatile variable",
  choices: ["Mutable variable", "Dynamic variable", "Volatile variable", "Immutable variable"]
}
];




// // //created ul li and question areas//
questions = document.querySelector(".questions");
choices1 = document.querySelector(".choices1");
answers = document.querySelector(".answer");
questionSections = document.querySelector("#question-section");
scoresForGame = document.querySelector(".score");
gameFirstScreen = document.querySelector("#gameInfosection");
startGamebutton = document.querySelector("#start-button");
finalPage = document.querySelector("#ask-initial");
showScore = document.querySelector("#score-show");
submitScore = document.querySelector("#btn-submit");
var initialText = document.querySelector("#initials");
var errorText = document.querySelector("#error-msg");
viewScore = document.querySelector("#lastpage");
viewScoreElement = document.querySelector("#view-scoretime");
highScore = document.querySelector("#high-scores");




let lists = document.querySelectorAll("#Options");
for (i = 0; i < lists.length; i++) {
  choicesForquiz = lists;
}


var questionNumbers = 0;

function displayQuestionsChoices() {

  questions.innerHTML = questionsForQuiz[questionNumbers].Q;
  for (i = 0; i < choicesForquiz.length; i++) {
    choicesForquiz[i].innerHTML = questionsForQuiz[questionNumbers].choices[i];
  }
}



for (let i = 0; i < choicesForquiz.length; i++) {
  choicesForquiz[i].addEventListener("click", answerCheck);

  function answerCheck() {
    if (choicesForquiz[i].innerHTML === questionsForQuiz[questionNumbers].A) {
      answers.innerHTML = "Correct";
      score++;
      scoreChange();
    } else {
      answers.innerHTML = "Wrong";
      secondsLeft -= 10;
      scoreChange();
      }
  
    questionNumbers++;
    displayQuestionsChoices();
    endGame();
  }
}


function scoreChange() {
  scoresForGame.textContent = score;
}

function startQuiz() {
  setTime();
  gameFirstScreen.classList.add("hide-gameinfo");
  questionSections.classList.remove("hide");
  displayQuestionsChoices();
  viewScore.classList.add("highscorepage-hide");
  viewScoreElement.classList.remove("view-scoretime-hide");
  
  }
  



function init(){
  gameFirstScreen.classList.remove("hide-gameinfo");
  startGamebutton.addEventListener("click", startQuiz);
  
  

}


function endGame(){
if (questionNumbers == 4 || secondsLeft === 0 ){
  finalPage.classList.remove("hide-ask-initial");
  gameFirstScreen.classList.add("hide-gameinfo");
  questionSections.classList.add("hide");
  clearInterval(timeInterval);
  showScore.innerHTML = "your score is " + " "  + score +" "+ "and you have finished the quiz in " + secondsLeft+" "+"seconds";

}

}










var storedData ="";

submitScore.addEventListener("click", function(event){
event.preventDefault();

if ( initialText.value === ""){

  errorText.innerHTML = "Initial can not be blank"

}else{
  errorText.innerHTML = "successfully added your score "
  setTimeout(function() {
    displayViewscore ();
  }, 1000)
  
}





viewScoreElement.addEventListener("click", displayViewscore);

function displayViewscore (){
  gameFirstScreen.classList.add("hide-gameinfo");
  finalPage.classList.add("hide-ask-initial");
  questionSections.classList.add("hide");
  viewScore.classList.remove("highscorepage-hide");
  viewScoreElement.classList.add("view-scoretime-hide");
}



var li = document.createElement("li");
li.textContent = "";
highScore.appendChild(li);

function displayScore(){
  if (scoreList !== null){
  var scoreList = JSON.parse(localStorage.getItem("storedData"));
  li.textContent = scoreList.initial + " "+ "finshed the game in " + scoreList.timeleft +" "+"and scored  "+scoreList.scores + " "+ "Points"
}}
displayScore();

function saveData(){
storedData = {
initial: initialText.value,
scores: score,
timeleft: secondsLeft
};
localStorage.setItem("storedData", JSON.stringify(storedData));
}
saveData();

});







init();









// function endGame (){
//   clearInterval(timeInterval);
// }

// // function addNewScore(){

// // }













