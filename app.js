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
  }

  function startQuiz() {
    $("#showHighScore").on("click", function () {
      showHighScore();
    });
    $("#startQuiz").on("click", function () {
      window.location.href = "index.html";
    });
    $("#submitBtn").on("click", function () {
      $("#submitBtn").hide();
      $("#popUp").hide();
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

  function showPopup(str, type, score) {
    $("#popUp").show();
    $("#popUp").attr("class", `alert alert-${type}`);
    $("#popUp").text(str + ". Your score is " + score);
    window.setTimeout(function () {
      $("#popUp").hide();
    }, 3000);
    $("#popUp").on("click", function () {
      $("#popUp").hide();
    });
  }

  function continueQuiz() {
    $(document).on("click", "#option", function () {
      humanChoice = parseInt($(this).attr("data-id"));
      if (humanChoice === questions[qCounter].a) {
        score += Math.floor(Math.random() * (20 - 1) + 1);
        updateScoreTimer();
        showPopup("Correct answer", "success", score);
      } else {
        timerCount -= 5;
        updateScoreTimer();
        showPopup("Wrong answer", "danger", score);
      }
      qCounter++;
      clearScreen();
      if (timerCount > 0) {
        nextQuestion();
      } else {
        timerCount = 0;
        showPopup("You ran out of time", "warning", score);
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

      if (!$name) {
        showPopup("Please enter a valid name", "info", score);
      } else {
        $("#name").val("");
        if (highScore === null) {
          highScore = [];
        }
        highScore.push({ $name, score });
        window.localStorage.setItem("highScore", JSON.stringify(highScore));
        showHighScore();
      }
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
    $("#showQuestion").append(
      `<div class='d-inline'>High Score</div>
      <div class='d-inline float-right btn' id='resetHighScore'>RESET Score</div>
      <table class='table'>
      <thead>
      <th scope='col'>Rank</th>
      <th scope='col'>Name</th>
      <th scope='col'>Score</th>
      </thead>
      <tbody id='tbody'></tbody>
      </table>`
    );
    var showCount = 7;
    if (highScore !== null) {
      if (highScore.length < showCount) {
        showCount = highScore.length;
      }
      for (var i = 0; i < showCount; i++) {
        $("#tbody").append(
          `<tr id='tr${i}'></tr>
          <th scope='row'>${i + 1}</th>
          <th>${highScore[i].$name}</th>
          <th>${highScore[i].score}</th>`
        );
      }
    }
  }

  startQuiz();
});
