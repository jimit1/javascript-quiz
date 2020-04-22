$(document).ready(function () {
  var questions = [
    {
      q: "Question 1",
      o: ["Answer 1-0", "Answer 1-1", "Answer 1-2", "Answer 1-3"],
      a: 0,
    },
    {
      q: "Question 2",
      o: ["Answer 2-0", "Answer 2-1", "Answer 2-2", "Answer 2-3"],
      a: 0,
    },
    {
      q: "Question 3",
      o: ["Answer 3-0", "Answer 3-1", "Answer 3-2", "Answer 3-3"],
      a: 0,
    },
    {
      q: "Question 4",
      o: ["Answer 4-0", "Answer 4-1", "Answer 4-2", "Answer 4-3"],
      a: 0,
    },
    {
      q: "Question 5",
      o: ["Answer 5-0", "Answer 5-1", "Answer 5-2", "Answer 5-3"],
      a: 0,
    },
  ];
  var score = 0;
  var timerCount = 100;
  var qCounter = 0;
  var humanChoice = 55;
  try {
    var highScore = JSON.parse(window.localStorage.getItem("highScore"));
  } catch {
    var highScore = [{}];
  }
  var timerInterval;

  function setTimer() {
    timerCount = 10;
    $("#timer").text("Timer: " + timerCount);
    timerInterval = setInterval(function () {
      timerCount--;
      $("#timer").text("Timer: " + timerCount);
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

  function startQuiz() {
    $("#showHighScore").on("click", function () {
      showHighScore();
    });
    $("#startQuiz").on("click", function () {
      window.location.href = "index.html";
    });
    $("#submitBtn").on("click", function () {
      setTimer();
      clearScreen();
      nextQuestion();
      continueQuiz();
    });
  }

  function nextQuestion() {
    if (qCounter < questions.length) {
      $("#showQuestion").text(questions[qCounter].q);
      var imageNext = "./assets/image" + qCounter + ".jpeg";
      $(".card-img").attr("src", imageNext);
      for (var i = 0; i < questions[qCounter].o.length; i++) {
        $("#showOptions").append(
          `<div id="option" data-id="${i}">${questions[qCounter].o[i]}</div>`
        );
      }
    }
  }

  function updateScoreTimer() {
    $("#score").text("Score: " + score);
    $("#timer").text("Timer: " + timerCount);
  }
  function continueQuiz() {
    $(document).on("click", "#option", function () {
      humanChoice = parseInt($(this).attr("data-id"));
      if (humanChoice === questions[qCounter].a) {
        score++;
        updateScoreTimer();
        //Have pop up here showing whether right or wrong answer
        // $("#popUp").append(`<div>"Right Answer"</div>`);
      } else {
        timerCount -= 5;
        updateScoreTimer();
        //Have pop up here showing whether right or wrong answer
      }
      qCounter++;
      clearScreen();
      nextQuestion();
      if (qCounter === questions.length) {
        timerCount = 0;
        clearInterval(timerInterval);
        updateScoreTimer();
        enterInitials();
      }
    });
  }

  function enterInitials() {
    $("#showQuestion").text("Enter your initials here");
    $(".card-img").attr("src", "./assets/enterName.jpeg");
    $("#showOptions").append("<form id='form'></form>");
    $("#form").append(
      "<input id='name' type='text' placeholder='enter name here'></input><br>"
    );
    $("#form").append(
      "<input id='btnSubmit' type='submit' value='Submit'></input>"
    );
    $(document).on("click", "#btnSubmit", function (e) {
      e.preventDefault();
      var $name = $("#name").val();
      $("#name").val("");
      if (highScore === null) {
        highScore = [];
      }
      highScore.push({ $name, score });
      window.localStorage.setItem("highScore", JSON.stringify(highScore));
      showHighScore();
    });
  }

  function showHighScore() {
    clearScreen();
    $(".card-img").attr("src", "./assets/highscore.jpeg");
    $("#showQuestion").append("<div class='d-inline'>High Score</div>");
    $("#showQuestion").append(
      "<div class='d-inline float-right' id='resetHighScore'>RESET Score</div>"
    );
    $("#resetHighScore").on("click", function () {
      window.localStorage.removeItem("highScore");
      //Insert a screen refresh here when pressed the Reset High Score Button
    });
    highScore.sort(function (a, b) {
      return b.score - a.score;
    });
    insertHighScoreTable();
  }

  function insertHighScoreTable() {
    $("#showOptions").append("<table class='table' id='table'></table>");
    $("#table").append("<thead id='thead'></thead>");
    $("#thead").append("<tr id='tr'></tr>");
    $("#tr").append("<th scope='col'>Rank</th>");
    $("#tr").append("<th scope='col'>Name</th>");
    $("#tr").append("<th scope='col'>Score</th>");
    $("#table").append("<tbody id='tbody'></tbody>");
    var showCount;
    if (highScore.length < 8) {
      showCount = highScore.length;
    } else {
      showCount = 7;
    }
    for (var i = 0; i < showCount; i++) {
      var rank = i + 1;
      $("#tbody").append(`<tr id='tr${i}'></tr>`);
      $(`#tr${i}`).append(`<th scope='row'>${rank}</th>`);
      $(`#tr${i}`).append(`<th>${highScore[i].$name}</th>`);
      $(`#tr${i}`).append(`<th>${highScore[i].score}</th>`);
    }
  }

  startQuiz();
});
