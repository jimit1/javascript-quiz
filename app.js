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
      a: 3,
    },
    {
      q: "Question 3",
      o: ["Answer 3-0", "Answer 3-1", "Answer 3-2", "Answer 3-3"],
      a: 2,
    },
    {
      q: "Question 4",
      o: ["Answer 4-0", "Answer 4-1", "Answer 4-2", "Answer 4-3"],
      a: 3,
    },
    {
      q: "Question 5",
      o: ["Answer 5-0", "Answer 5-1", "Answer 5-2", "Answer 5-3"],
      a: 1,
    },
  ];
  var score = 0;
  var timerCount = 100;
  var qCounter = 0;
  var humanChoice = 55;
  var highScore = [{}];

  function setTimer() {
    timerCount = 100;
    $("#timer").text("Timer: " + timerCount);
    var timerInterval = setInterval(function () {
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
    $("#submitBtn").on("click", function () {
      setTimer();
      clearScreen();
      nextQuestion();
      continueQuiz();
    });
  }

  function continueQuiz() {
    $(document).on("click", "#option", function () {
      humanChoice = parseInt($(this).attr("data-id"));
      if (humanChoice === questions[qCounter].a) {
        score++;
        updateScoreTimer();
        // $("#popUp").append(`<div>"Right Answer"</div>`);
      } else {
        timerCount--;
        updateScoreTimer();
      }
      qCounter++;
      clearScreen();
      nextQuestion();
      if (qCounter === questions.length) {
        enterInitials();
      }
    });
  }

  function enterInitials() {
    $("#showQuestion").text("Enter your initials here");
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
      console.log($name);
      console.log(score);
      $("#name").val("");
      highScore.push({ $name, score });
      console.log(highScore);
      // todoArray.push(todoText.value);
      // todoText.value = "";
      // window.localStorage.setItem("todos", JSON.stringify(todoArray));
      // renderTodos();
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
  startQuiz();
});
