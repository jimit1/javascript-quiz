$(document).ready(function () {
  var questions = [
    {
      img:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      q: "Question 1",
      o: ["Answer 1-0", "Answer 1-1", "Answer 1-2", "Answer 1-3"],
      a: 0,
    },
    {
      img:
        "https://images.unsplash.com/photo-1526649661456-89c7ed4d00b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      q: "Question 2",
      o: ["Answer 2-0", "Answer 2-1", "Answer 2-2", "Answer 2-3"],
      a: 3,
    },
    {
      img:
        "https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      q: "Question 3",
      o: ["Answer 3-0", "Answer 3-1", "Answer 3-2", "Answer 3-3"],
      a: 2,
    },
    {
      img:
        "https://images.unsplash.com/photo-1544256718-3bcf237f3974?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      q: "Question 4",
      o: ["Answer 4-0", "Answer 4-1", "Answer 4-2", "Answer 4-3"],
      a: 3,
    },
    {
      img:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      q: "Question 5",
      o: ["Answer 5-0", "Answer 5-1", "Answer 5-2", "Answer 5-3"],
      a: 1,
    },
  ];
  var score = 0;
  var timerCount = 100;
  var $timer = $("#timer");
  $timer.text("Timer: " + timerCount);
  var $score = $("#score");
  $score.text("Score: " + score);
  var qCounter = 0;

  function setTimer() {
    timerCount = 100;
    $timer.text("Timer: " + timerCount);
    var timerInterval = setInterval(function () {
      timerCount--;
      $timer.text("Timer: " + timerCount);
      if (timerCount === 0) {
        clearInterval(timerInterval);
      }
    }, 1000);
  }

  function clearScreen() {
    $("#showOptions").html("");
    $("#showQuestion").html("");
    $("#popUp").html("");
  }

  setTimer();
  $("#submitBtn").on("click", function () {
    clearScreen();
    startQuiz();
  });

  $(document).on("click", "#option", function () {
    if (qCounter < questions.length) {
      qCounter++;
      console.log(qCounter);
      console.log(questions.length);
      clearScreen();
      startQuiz();
    } else {
      console.log("quiz is over");
    }
  });

  function startQuiz() {
    var humanChoice = 55;
    $("#showQuestion").text(questions[qCounter].q);
    for (var i = 0; i < questions[qCounter].o.length; i++) {
      $("#showOptions").append(
        `<div id="option" data-id="${i}">${questions[qCounter].o[i]}</div>`
      );
      $(document).on("click", "#option", function () {
        humanChoice = parseInt($(this).attr("data-id"));
        if (humanChoice === questions[qCounter].a) {
          score++;
          updateScoreTimer();
        } else {
          timerCount--;
          updateScoreTimer();
        }
      });
    }
  }

  function updateScoreTimer() {
    $score.text("Score: " + score);
    $timer.text("Timer: " + timerCount);
  }

  // function checkAnswer() {}

  // function checkAnswers() {
  //   $("#options").on("click", function () {
  //     // var humanChoice = $(this).attr("data-id");
  //     // var humanChoice = $(this).attr("data-id");

  //     var humanChoice = parseInt(this.getAttribute("data-id"));
  //     console.log(humanChoice);
  //   });

  //   // $(document).on("click", "#option", function () {
  //   //   var humanChoice = $("#option").attr("data-id");
  //   //   console.log(humanChoice);
  //   // });
  // }

  // console.log(questions[0].a1);
  // console.log(correctAnswers[0]);
});
