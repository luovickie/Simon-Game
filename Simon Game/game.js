var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

function nextSequence()  {
  userClickedPattern = [];
  var numb = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[numb];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)

  level++;
  $("#level-title").text("Level " + level);
}

$(".btn").click(function () { 
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  if (checkAnswer(userClickedPattern.length-1))  {
    if  (userClickedPattern.length == gamePattern.length) {
      setTimeout (function()  {
        nextSequence();
      }, 1000)
    }
  }
  else  {
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout  (function() {
      $("body").removeClass("game-over");
    }, 200)
    gamePattern = [];
    level = 0;
    start = false;
  }
});

function playSound(name)  {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour)  {
  $("." + currentColour).addClass("pressed");
  setTimeout (function()  {
    $("." + currentColour).removeClass("pressed");
  }, 100)
}

$(document).keypress(function () { 
  if (!start) {
    nextSequence()   
    start = true; 
  }
});

function checkAnswer(currLevel)  {
  if (userClickedPattern[currLevel] === gamePattern[currLevel])  {
    return true;
  }
}