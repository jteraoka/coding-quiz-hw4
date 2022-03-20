
        // var highestScore = document.querySelector("#score1"); 
        // var middlestScore = document.querySelector("#score2"); 
        // var lowestScore = document.querySelector("#score3"); 
        //     highestScore.textContent = document.querySelector("#score1");  
        //     middlestScore.textContent = document.querySelector("#score2"); 
        //     lowestScore.textContent = document.querySelector("#score3"); 

        // function nextQuestion() {
   
//         quizContainer.innerHTML = "(questionArray[i]).question";
//         document.getElementById("#c1") = (questionArray[i].answers.a);
//         document.getElementById("#c2") = (questionArray[i].answers.b);
//         document.getElementById("#c3") = (questionArray[i].answers.c);
// }

   //Selecting html elements//
var quizContainer = document.querySelector("#teleprompter");
var scoreBoard = document.querySelector("#score");
var startButton = document.querySelector("#start");
var timer = document.querySelector("#timer");
var choiceBox = document.querySelector("#choices");

    //Game states//
var state = "pre";
var currentScore = 0;
var timeLeft = 10;

    //Leaderboards//
var highScoresSaved = 3;
var highScoreString = localStorage.getItem(highScores);
var highScores = JSON.parse(highScoreString) ?? [];
var lowestScore = highScores[highScoresSaved-1]?.score ?? 0;

    //Save scores//
function saveHighScore(score, highScores) {
    var playerName = prompt("High score! Enter your name:");
    var newScore = { currentScore, playerName };

    highScores.push(newScore);
    highScores.sort((a,b) => b.score - a.score);
    highScores.splice(highScoresSaved);
    localStorage.setItem(highScoresSaved, JSON.stringify(highScores));
}
    //Check scores//
function checkScores(score) {
    var highScores = JSON.parse(localStorage.getItem(highScores)) ?? [];
    var lowestScore = highScores[highScoresSaved-1]?.score ?? 0;

    if (score > lowestScore) {
        saveHighScore(score, highScores); // 
        showHighScores(); //
    }

}
    //Game over//
function gameOver() {
    checkScores(currentScore);

    quizContainer.innerHTML = "<h2>Game Over</h2><h3>High Scores</h3><ol><li id='score1'></li><li id='score2'></li><li id='score3'></li>"
}
    //Timeout clock//
function countdown() {
    var timeInterval = setInterval(function () {
        timeLeft--;
      if (timeLeft > 1) {
        timer.textContent = "Time remaining: " + timeLeft
      } else {
        timer.textContent = 'Time out';
        clearInterval(timeInterval);
        state = "post";
        gameOver();
      }
    }, 1000);
  }

    //Start button cascade//
function buildQuiz() {
    state = "start";
    console.log(state);
    countdown();
    var availableAnswers = document.querySelector("#choices");
    var currentQuestion = document.getElementById("#currentQuestion");
    var currentAnswer = [" "];
    currentQuestion = [" "];
    availableAnswers = [" "];

    
    //Question array//
   var questionArray = [
    {
        question: "question text",
        choices: ["a: wrong", "b: correct", "c: wrong"],
        correctAnswer: "b: correct",
    },
    {
        question: "question text",
        choices: ["a: wrong", "b: correct", "c: wrong"],
        correctAnswer: "b: correct",
    },
    
];

    for (var i= 0; i < questionArray.length; i++) {
         var currentQuestion = document.querySelector("#currentQuestion");
             currentQuestion.textContent = questionArray[i].question;
         var currentChoices = document.querySelector("#choices");
             choices = questionArray[i].choices;
             currentAnswer = questionArray[i].correctAnswer;
         var name = "radio"+i; 
         for ( var opt in choices ) {
         
           var radioEl = document.createElement("input");
           radioEl.type = "radio";     
           radioEl.class = "answer";
           radioEl.value = choices[opt];
           radioEl.name = name;
           currentChoices.appendChild(radioEl);
           var label = document.createElement("Label");
           label.innerHTML = choices[opt];
           currentChoices.appendChild(label);
           currentChoices.appendChild(document.createElement("br"));
         }
         
         document.body.appendChild(document.createElement("br"));
         
       }
         console.log(currentQuestion);
       //listener//
    //    document.querySelectorAll("radio").click()
    //         var chosenAnswer = target;
    //             console.log("answer click");
    //             if (chosenAnswer === currentAnswer) {
    //                 currentScore++;
    //                 console.log("nice!");
    //             } else {
    //                 timeLeft -= 3;
    //             }
    //             currentChoices.textContent = " "
    //             currentQuestion.textContent = " "
        ;}
    
    //Add listeners//
startButton.addEventListener("click", buildQuiz);