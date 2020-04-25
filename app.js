$(document).ready(function () {
  var questions = [
    {
      q:
        "Q1 - Which of the following is true about variable naming conventions in JavaScript?",
      o: [
        "A - You should not use any of the JavaScript reserved keyword as variable name.",
        "B - JavaScript variable names should not start with a numeral (0-9).",
        "C - Both of the above.",
      ],
      a: 2,
    },
    {
      q:
        "Q2 - Which of the following is true about cookie handling in JavaScript?",
      o: [
        "A - JavaScript can manipulate cookies using the cookie property of the Document object.",
        "B - JavaScript can read, create, modify, and delete the cookie or cookies that apply to the current web page.",
        "C - Both of the above.",
        "D - None of the above.",
      ],
      a: 2,
    },
    {
      q:
        "Q3 - Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
      o: ["A - last()", "B - push()", "C - put()", "D - None of the above."],
      a: 1,
    },
    {
      q:
        "Q4 - Which built-in method returns the calling string value converted to upper case?",
      o: [
        "A - toUpperCase()",
        "B - toUpper()",
        "C - changeCase(case)",
        "D - None of the above.",
      ],
      a: 0,
    },
    {
      q:
        "Q5 - Which of the following function of Boolean object returns a string of either 'true' or 'false' depending upon the value of the object?",
      o: [
        "A - toSource()",
        "B - valueOf()",
        "C - toString()",
        "D - None of the above.",
      ],
      a: 2,
    },
    {
      q:
        "Q6 - Which of the following function of String object is used to match a regular expression against a string?",
      o: [
        "A - concat()",
        "B - match()",
        "C - search()",
        "D - replace()",
        "E - None of the above.",
      ],
      a: 1,
    },
  ];
  var score = 0;
  var timerCount;
  var qCounter = 0;
  var humanChoice = 55;
  var answer = "";
  try {
    var highScore = JSON.parse(window.localStorage.getItem("highScore"));
  } catch {
    var highScore = [{}];
  }
  var timerInterval;

  function setTimer() {
    timerCount = 50;
    $("#timer").text("Timer: " + timerCount);
    timerInterval = setInterval(function () {
      timerCount--;
      $("#timer").text("Timer: " + timerCount);
      if (timerCount < 1) {
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
      $(".card-img").attr("src", `./assets/image${qCounter}.jpeg`);
      for (var i = 0; i < questions[qCounter].o.length; i++) {
        $("#showOptions").append(
          `<div id="option" class="btn p-0 text-left" data-id="${i}">${questions[qCounter].o[i]}</div><br>`
        );
      }
    }
  }

  function updateScoreTimer() {
    $("#score").text("Score: " + score);
    $("#timer").text("Timer: " + timerCount);
  }

  function showPopUp() {
    var timerCount2 = 2;
    var timerInterval2 = setInterval(function () {
      timerCount2--;
      $("#popUp").append(`<small class='text-muted'>${answer}</small>`);
      if (timerCount2 === 0) {
        clearInterval(timerInterval2);
        $("#popUp").html("");
      }
    }, 500);
  }

  function continueQuiz() {
    $(document).on("click", "#option", function () {
      humanChoice = parseInt($(this).attr("data-id"));
      if (humanChoice === questions[qCounter].a) {
        score += Math.floor(Math.random() * (20 - 1) + 1);
        updateScoreTimer();
        answer = "Correct";
      } else {
        timerCount -= 5;
        updateScoreTimer();
        answer = "Wrong";
      }
      showPopUp();
      qCounter++;
      clearScreen();
      if (timerCount > 0) {
        nextQuestion();
      } else {
        timerCount = 0;
        answer = "You ran out of time";
        showPopUp();
        clearInterval(timerInterval);
        updateScoreTimer();
        enterInitials();
      }

      if (qCounter === questions.length) {
        clearInterval(timerInterval);
        enterInitials();
      }
    });
  }

  function enterInitials() {
    $("#score").text("");
    $("#timer").text("");
    $("#showQuestion").text(`Your final score is ${score}`);
    $(".card-img").attr("src", "./assets/enterName.jpeg");
    $("#showOptions").append(`<div>Enter your name here</div>`);
    $("#showOptions").append("<form id='form'></form>");
    $("#form").append(
      "<input id='name' autofocus type='text' class='mr-3' placeholder='enter name here'></input>"
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
    $(document).on("click", "#resetHighScore", function () {
      window.localStorage.removeItem("highScore");
      highScore = null;
      insertHighScoreTable();
    });
    if (highScore !== null) {
      highScore.sort(function (a, b) {
        return b.score - a.score;
      });
    }
    insertHighScoreTable();
  }

  function insertHighScoreTable() {
    clearInterval(timerInterval);
    $("#score").text("");
    $("#timer").text("");
    clearScreen();
    $(".card-img").attr("src", "./assets/highscore.jpeg");
    $("#showQuestion").append("<div class='d-inline'>High Score</div>");
    $("#showQuestion").append(
      "<div class='d-inline float-right btn' id='resetHighScore'>RESET Score</div>"
    );
    $("#showOptions").append("<table class='table' id='table'></table>");
    $("#table").append("<thead id='thead'></thead>");
    $("#thead").append("<tr id='tr'></tr>");
    $("#tr").append("<th scope='col'>Rank</th>");
    $("#tr").append("<th scope='col'>Name</th>");
    $("#tr").append("<th scope='col'>Score</th>");
    $("#table").append("<tbody id='tbody'></tbody>");
    var showCount;
    if (highScore !== null) {
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
  }

  startQuiz();
});
