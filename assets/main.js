
var errorMsg = new Audio('negative_beeps-6008.mp3');
var correctMsg = new Audio("correct-2-46134.mp3");
var startClick = new Audio("big-impact-7054.mp3");
var clicks = new Audio("interface-124464.mp3");

var score = 0;

var timeInterval;

// this creates the timer on the right side //
var timeEl = document.querySelector(".time");


var secondsLeft = 35;

function setTime() {
  timeEl.textContent = "Time :" + " " + secondsLeft;
  timeInterval = setInterval(() => {
    if ( secondsLeft > 0){
    secondsLeft--;
    timeEl.textContent = "Time :" + " " + secondsLeft;
    }

    if (secondsLeft === 0) {
      clearInterval(timeInterval);
      endGame();
      
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
  choices: [" Alternative to if-else", "Switch statement", "If-then-else statement", "immediate if"]
}, 
{
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
  A:"Volatile variable",
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
goBackButton = document.querySelector("#go-back");
clearScoreButton = document.querySelector("#clear-score");
viewHighscore = document.querySelector("View-latesthighscores");



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
      answers.setAttribute("style", "color:green");
      
correctMsg.play();
      
      score++;
      scoreChange();
    } else {
      answers.innerHTML = "Wrong";
      answers.setAttribute("style", "color:red");
      errorMsg.play();
      if (secondsLeft< 10){
          secondsLeft = 0;
          
      }else{ 
        secondsLeft -= 10;
      }
      timeEl.textContent = "Time :" + " " + secondsLeft;
      scoreChange();
      }
  
    questionNumbers++;
    displayQuestionsChoices();
    endGame();
  }
}


function scoreChange() {
  scoresForGame.textContent = "You got"+ " "+ score + " "+"right"; 
}

function startQuiz() {
  setTime();
  gameFirstScreen.classList.add("hide-gameinfo");
  questionSections.classList.remove("hide");
  displayQuestionsChoices();
  viewScore.classList.add("highscorepage-hide");
  viewScoreElement.classList.add("view-scoretime-hide");
  
  }
  



function init(){
  gameFirstScreen.classList.remove("hide-gameinfo");
  startGamebutton.addEventListener("click", startQuiz);
  viewScoreElement.classList.remove("view-scoretime-hide");
startGamebutton.addEventListener("click", function(){
  startClick.play();
})
 
  
}


function endGame(){
if (questionNumbers === 4|| secondsLeft === 0 ){
  finalPage.classList.remove("hide-ask-initial");
  gameFirstScreen.classList.add("hide-gameinfo");
  questionSections.classList.add("hide");
  clearInterval(timeInterval);
  showScore.innerHTML =  "your score is " + " "  + score +" "+ "and you have finished the quiz in " + secondsLeft+" "+"seconds";

}

}

submitScore.addEventListener("click", function(event){
event.preventDefault();
clicks.play();


if ( initialText.value === ""){

  errorText.innerHTML = "Initial can not be blank"

}else{
  saveData();
  errorText.innerHTML = "successfully added your score "
  setTimeout(function() {
    displayViewscore ();
  }, 1000)
}
});




viewScoreElement.addEventListener("click", displayViewscore);

function displayViewscore (){
  gameFirstScreen.classList.add("hide-gameinfo");
  finalPage.classList.add("hide-ask-initial");
  questionSections.classList.add("hide");
  viewScore.classList.remove("highscorepage-hide");
  viewScoreElement.classList.add("view-scoretime-hide");
  displayScore();
  clearInterval(timeInterval);
  timeEl.setAttribute("style", "display:none");
}

var storedData = [];

function displayScore() {
  var storedData = JSON.parse(localStorage.getItem("storedData")) || [];
  storedData.sort(function(a, b) {
    if (b.timeleft === a.timeleft) {
      return b.scores - a.scores;
    }
    return b.timeleft - a.timeleft;});

    
  for (var i = 0; i < storedData.length; i++) {
    var li = document.createElement("li");
    
    li.setAttribute("style", " color:white; background: rgb(32, 32, 138); padding: 5px; margin:10px; border-radius: 10px;");
    li.textContent = storedData[i].initial + " finished the game in " + storedData[i].timeleft + " and scored " + storedData[i].scores + " points";
    highScore.appendChild(li);
    li.setAttribute("id","deleteContents");
    
}

}

function saveData() {
  var storedData = JSON.parse(localStorage.getItem("storedData")) || [];
  storedData.push ({
    initial: initialText.value,
    scores: score,
    timeleft: secondsLeft
  });

  localStorage.setItem("storedData", JSON.stringify(storedData));
}




goBackButton.addEventListener("click", function(){
  init();
  viewScore.classList.add("highscorepage-hide");
  location. reload() 
  clicks.play();

})


clearScoreButton.addEventListener("click", function(){
  localStorage.clear();
  clicks.play();
  highScore.remove();
});




 init();







