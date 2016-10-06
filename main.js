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
})


function Question( text, choices, answer, answerTwo ) {
  this.text = text
  this.choices = choices
  this.answer = answer
  this.answerTwo = answerTwo
  this.correctAnswer = function( choice ) {
    return choice === this.answer || choice === this.answerTwo
  }
}

function Quiz ( questions ) {
  this.score = 0
  this.questions = questions
  this.questionIndex = 0
  this.getQuestionIndex = function() {
    return this.questions[this.questionIndex]
  }
  this.isEnded = function() {
    return this.questions.length === this.questionIndex
  }
}

Quiz.prototype.guess = function( answer, cb ) {
  var choices = quiz.getQuestionIndex().choices
  // $ ("#question").show('slide', {direction: 'right'}, 1000)
  $ ("#question").fadeOut(300, function(){
    cb()
  })
  for(var i = 0; i < choices.length; i++) {
    $ ("#choice" + i).text(choices[i]).fadeOut(300, function() {
      cb()
    })
    $ ("#btn" + i).fadeOut(300, function() {
      cb()
    })
  }

  if(this.getQuestionIndex().correctAnswer(answer)) {
    if(this.questions[this.questionIndex].answer === answer) {
      this.score++
    } else {
      this.score += 2
    }
  }

  this.questionIndex++
}


var quest = [  
  new Question("choose an animal?", ["bear", "pigeon", "cat"], "bear", "cat"),
  new Question("choose a fruit?", ["apple", "grapefruit", "banana"], "banana", "grapefruit"),
  new Question("choose a vegetable?", ["tomato", "zuccini", "cucumber"], "tomato", "zuccini"),
  new Question("choose a fruit?", ["apple", "grapefruit", "banana"], "banana", "apple"),
  new Question("choose a vegetable?", ["tomato", "paprika", "cucumber"], "tomato", "paprika")
]

var quiz = new Quiz( quest )

function populate (  ) {
  if (quiz.isEnded()) {
    showScores()
  } else {
    //show question
    var element = document.getElementById("question")
    console.log(element)  // get question from html file that has ID question
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
  var button = document.getElementById(id)
  button.onclick = function () {
    quiz.guess( gs, populate )
  }
}

function showScores ( ) {
  // var gameOverHtml = "<h1 id='result'>We suggest you get ...</h1>"
  if (quiz.score < 2) {
    gameOverHtml = "<h2 id='score'>... the Perfect 10 On Fleek </h2>"
  } else if ( 2 <= quiz.score < 4 ) {
    gameOverHtml = "<h2 id='score'>... the Perfect 10 Flawless </h2>"
  } else {
    gameOverHtml = "<h2 id='score'>... the Perfect 10 Godlike </h2>"
  }
  $ ("h1 #test-title").html("<h1 id='result'>We suggest you get ...</h1>")
  $ ('h2 #score').html(gameOverHtml)
}

populate()