// Initial set up to hide the elements
$(document).ready(function() {
  $( '.buttons' ).hide()
  $( '#btn0' ).hide()
  $( '#btn1' ).hide()
  $( '#btn2' ).hide()
  $( '#choice0' ).hide()
  $( '#choice1' ).hide()
  $( '#choice2' ).hide()
  $( '#question' ).hide()
})

// Upon push of the first button show the first question
// and, thus, start quiz
$( '#start-button' ).click(function( ){
  $( '#start-button' ).fadeOut(500)
  $( '.buttons' ).fadeIn( 1000 )
  $( '#question' ).delay(500).fadeIn( 2000 )
  $( '#btn0' ).delay(500).fadeIn( 2000 )
  $( '#btn1' ).delay(500).fadeIn( 2000 )
  $( '#btn2' ).delay(500).fadeIn( 2000 )
  $( '#choice0' ).delay(500).fadeIn( 2000 )
  $( '#choice1' ).delay(500).fadeIn( 2000 )
  $( '#choice2' ).delay(500).fadeIn( 2000 )
  populate()
})

function Question( text, choices, answer, answerTwo ) {
  // Create an object about a question with the question text, choices,
  // answers, and add an answer evaluation function
  this.text = text
  this.choices = choices
  this.answer = answer
  this.answerTwo = answerTwo
  this.answerEvaluation = function( choice ) {
    // the function evaluates whether the answer chosen has been
    // this.answer or this.answerTwo, because the two have weights
    return choice === this.answer || choice === this.answerTwo
  }
}

function Quiz ( questions ) {
  // Object for the quiz itself to count the score (Question.answer gives
  // 1 point, Question.answerTwo gives 2 points, and the undefined answers give 
  // no points)
  this.score = 0
  this.questions = questions
  this.questionIndex = 0
  this.getQuestionIndex = function() {
    // return the index of the question in the list
    return this.questions[this.questionIndex]
  }
  this.isEnded = function() {
    // checks if the quiz has ended
    return this.questions.length === this.questionIndex
  }
  this.guess = function ( answer, cb ) {
    var choices = quiz.getQuestionIndex().choices
    // jQuery used below to style the quiz; cb is a callback function
    // for the fadeOut/fadeIn of the next questions and answers 
    // to run smoothly
    $ ("#question").fadeOut(300, function(){
      cb()
    })
    for(var i = 0; i < choices.length; i++) {
      $ ("#choice" + i).text(choices[i]).fadeOut(300, function() {
        cb()
      })
// ------------------------------------------
    //   $ ("#choice" + i).text(choices[i]).animate({left: '-50%'}, 750, function() {
    //   cb()
    // })


// ------------------------------------------
      $ ("#btn" + i).fadeOut(300, function() {
        cb()
      })
    }


    if(this.getQuestionIndex().answerEvaluation(answer)) {
      if(this.questions[this.questionIndex].answer === answer) {
        // if Question.answer is chosen, add 1 point
        this.score++
      } else {
        // if Question.answerTwo is chosen, add 2 points
        this.score += 2
      }
    }
    this.questionIndex++
  }
}

// Create the questions of the quiz, and initialize the Quiz object, respectively
var quest = [  
new Question("choose an animal?", ["bear", "pigeon", "cat"], "bear", "cat"),
new Question("choose a fruit?", ["apple", "grapefruit", "banana"], "banana", "grapefruit"),
new Question("choose a vegetable?", ["tomato", "zuccini", "cucumber"], "tomato", "zuccini"),
new Question("choose a fruit?", ["apple", "grapefruit", "banana"], "banana", "apple"),
new Question("choose a vegetable?", ["tomato", "paprika", "cucumber"], "tomato", "paprika")
]

var quiz = new Quiz( quest )

function populate (  ) {
  // function used to show either the end of the quiz or the next question
  if (quiz.isEnded()) {
    showScores()
  } else {
    //show question
    var element = document.getElementById("question")
    
    $ ("#question").text(quiz.getQuestionIndex().text).fadeIn(300)
    // show choices
    var choices = quiz.getQuestionIndex().choices
    for(var i = 0; i < choices.length; i++) {
      $ ("#choice" + i).text(choices[i]).fadeIn(300)
      $ ("#btn" + i).fadeIn(300)
      guess("btn" + i, choices[i])
    }
  }
}

function guess (id, gs) {
  // on button push trigger Quiz.guess function
  var button = document.getElementById(id)
  button.onclick = function () {
    quiz.guess( gs, populate )
  }
}

function showScores ( ) {
  // Show the result of the quiz
  if (quiz.score < 2) {
    $ ("#test-title").html("<h1 id='result'>We suggest you get ...</h1>")
    $ ('#score').html("<h2 id='score'>... the Perfect 10 On Fleek </h2>")
  } else if ( 2 <= quiz.score < 4 ) {
    $ ("#test-title").html("<h1 id='result'>We suggest you get ...</h1>")
    $ ('#score').html("<h2 id='score'>... the Perfect 10 Flawless </h2>")
  } else {
    $ ("#test-title").html("<h1 id='result'>We suggest you get ...</h1>")
    $ ('#score').html("<h2 id='score'>... the Perfect 10 Godlike </h2>")
  }
}


$('#runner').on('mouseover', function(){
    var offset = $(this).offset();
    var goX = Math.random() < 0.5 ? -1 : 1;
    var goY = Math.random() < 0.5 ? -1 : 1;
    var targetSize = 20;
    if(goX > 0 && offset.left + targetSize * goX + targetSize> 300
      || goX < 0 && offset.left + targetSize * goX  - targetSize < 0) {
        goX = goX * (-1);
    }
    
    if(goY > 0 && offset.top + targetSize * goY + targetSize> 200
      || goY < 0 && offset.top + targetSize * goY - targetSize < 0) {
        goY = goY * (-1);
    }
    $(this).css('top', offset.top + 20 * goY);
    $(this).css('left', offset.left + 20 * goX);
});