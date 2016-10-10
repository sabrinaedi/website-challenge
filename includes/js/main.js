$(document).ready(function(){
  // CODE PART FROM TEMPLATE
  // Initialize Tooltip
  $('[data-toggle="tooltip"]').tooltip();
  
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {

      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  })
  // CODE PART NEEDED AND WRITTEN FOR THE QUIZ
  $( '.buttons' ).hide()
  $( '#btn0' ).hide()
  $( '#btn1' ).hide()
  $( '#btn2' ).hide()
  $( '#choice0' ).hide()
  $( '#choice1' ).hide()
  $( '#choice2' ).hide()
  $( '#question' ).hide()
})

// #start-button
$( ".fa-play" ).click(function( ){
  $( ".fa-play" ).fadeOut(500)
  $( "h1#test-title").fadeOut(500)
  $( '.buttons' ).fadeIn( 500 )
  $( '#question' ).delay(500).fadeIn( 500 )
  $( '#btn0' ).delay(500).fadeIn( 500 )
  $( '#btn1' ).delay(500).fadeIn( 500 )
  $( '#btn2' ).delay(500).fadeIn( 500 )
  $( '#choice0' ).delay(500).fadeIn( 500 )
  $( '#choice1' ).delay(500).fadeIn( 500 )
  $( '#choice2' ).delay(500).fadeIn( 500 )
  populate()
})

// Upon push of the first button show the first question
// and, thus, start quiz


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
new Question("WOULD YOU RATHER HAVE:", ["FOUR ARMS", "TWO STOMACHS", "FIVE EARS"], "FOUR ARMS", "FIVE EARS"),
new Question("WOULD YOU RATHER:", ["BE RICH AND UGLY", "OWN A SKI LODGE", "BE A CAT NAMED FLUFFY"], "BE RICH AND UGLY", "BE A CAT NAMED FLUFFY"),
new Question("WOULD YOU RATHER BE ATTACKED BY:", ["ANGRY PIRANHA", "GIANT HAMSTER", "MIKE TYSON"], "ANGRY PIRANHA", "GIANT HAMSTER"),
new Question("WOULD YOU RATHER EAT:", ["AN EXTRA TOE", "A KOALA", "10 MILLION DOLLARS"], "AN EXTRA TOE", "10 MILLION DOLLARS"),
new Question("WOULD YOU RATHER KISS:", ["A CONSTIPATED CLOWN", "A BLUE WHALE", "YOUR DENTIST"], "YOUR DENTIST", "A CONSTIPATED CLOWN")
]

var quiz = new Quiz( quest )

function populate () {
  // function used to show either the end of the quiz or the next question
  if (quiz.isEnded()) {
    $ ("#question").fadeOut(300)
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
  if (quiz.score <= 3) {
    $ ("#test-title").html("<h1 id='result'>We suggest you get ...</h1>").fadeIn(300)
    $ ('#score').html("<h2 id='score'>...On Fleek </h2>").hide().delay(300).fadeIn(3000)
  } else if ( 4 <= quiz.score && quiz.score< 7 ) {
    $ ("#test-title").html("<h1 id='result'>We suggest you get ...</h1>").fadeIn(300)
    $ ('#score').html("<h2 id='score'>... Flawless </h2>").hide().delay(300).fadeIn(3000)
  } else {
    $ ("#test-title").html("<h1 id='result'>We suggest you get ...</h1>").fadeIn(300)
    $ ('#score').html("<h2 id='score'>... Godlike </h2>").hide().delay(300).fadeIn(3000)
  }
}

/*NONO CHANGES -> GOOGLE MAPS */

function initMap() {
        // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 52.379, lng:  4.899},
    scrollwheel: false,
    zoom: 8
  });
}

$('#runner, #runnerB, #runnerC').on('mouseover', function(){
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