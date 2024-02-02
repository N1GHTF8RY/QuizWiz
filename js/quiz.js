const itemList = [
  { text: "general knowledge", imageUrl: "images/category/general-knowledge.png", cat: 9  },
  { text: "books", imageUrl: "images/category/books.png", cat: 10  },
  { text: "films", imageUrl: "images/category/films.png" , cat: 11 },
  { text: "music", imageUrl: "images/category/music.png" , cat: 12 },
  { text: "television", imageUrl: "images/category/television.png", cat: 13 },
  { text: "video games", imageUrl: "images/category/video-game.png", cat: 14  },
  { text: "board games", imageUrl: "images/category/board-games.png", cat: 15 },
  { text: "science and nature", imageUrl: "images/category/science.png", cat: 16  }
];


document.addEventListener("DOMContentLoaded", function () {

const container = document.querySelector(".container-grid");

itemList.forEach((item, index) => {
const card = document.createElement("div");
card.classList.add("card", "custom-class", "col-auto" , "col-centered" , "animated" ,  "wow" , "jackInTheBox" , "slow");

const img = document.createElement("img");
img.src = item.imageUrl;

// Add different classes to even and odd images
if (index % 2 === 0) {
img.classList.add("img-fluid", "mx-auto", "d-block", "animated", "wow", "jello", "slow");
} else {
img.classList.add("img-fluid", "mx-auto", "d-block", "animated", "wow", "rotateIn", "slower");
}

card.appendChild(img);

const text = document.createElement("p");
text.textContent = item.text;
card.appendChild(text);

// Add cl ick event listener to each card
card.addEventListener("click", function () {
  // Call the external function and pass the item
  handleItemClick(item);
});

container.appendChild(card);
});
});







const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text");

const progress = (value) => {
  const percentage = (value / time) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

const 
  quiz = document.querySelector(".quiz"),
  startScreen = document.querySelector(".start-screen"),
  containerCategory = document.querySelector(".container"),
  containerBox = document.querySelector(".container-box");
  backButton = document.querySelector(".back-button img");

let questions = [],
  time = 30,
  score = 0,
  currentQuestion,
  timer;




const startQuiz = (cat) => {
  const num = 5,
    
    diff = "easy";
     
  const url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      questions = data.results;
      setTimeout(() => {
        startScreen.classList.add("hide");
        quiz.classList.remove("hide");
        containerCategory.classList.remove("hide");
        backButton.classList.add("hide");
        currentQuestion = 1;
        showQuestion(questions[0]);
      }, 10);
    });
  };
  function handleItemClick(item) {
    startQuiz(item.cat);
    // You can do more with the clicked item here
    
  }



const showQuestion = (question) => {
  const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper");
  questionNumber = document.querySelector(".number");

  questionText.innerHTML = question.question;

  const answers = [
    ...question.incorrect_answers,
    question.correct_answer.toString(),
  ];
  answersWrapper.innerHTML = "";
  answers.sort(() => Math.random() - 0.5);
  answers.forEach((answer) => {
    answersWrapper.innerHTML += `
                  <div class="answer ">
            <span class="text">${answer}</span>
            <span class="checkbox">
              <i class="fas fa-check"></i>
            </span>
          </div>
        `;
  });

  
  
  

  questionNumber.innerHTML = ` Question <span class="current">${
    questions.indexOf(question) + 1
  }</span>
            <span class="total">/${questions.length}</span>`;
  //add event listener to each answer
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("checked")) {
        answersDiv.forEach((answer) => {
          answer.classList.remove("selected");
        });
        answer.classList.add("selected");
        submitBtn.disabled = false;
      }
    });
  });

  time = 15;
  startTimer(time);
};

const startTimer = (time) => {
  timer = setInterval(() => {
    if (time === 3) {
      playAdudio("countdown.mp3");
    }
    if (time >= 0) {
      progress(time);
      time--;
    } else {
      checkAnswer();
    }
  }, 1000);
};



const submitBtn = document.querySelector(".submit"),
  nextBtn = document.querySelector(".next");
submitBtn.addEventListener("click", () => {
  checkAnswer();
});

nextBtn.addEventListener("click", () => {
  nextQuestion();
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
});

const checkAnswer = () => {
  clearInterval(timer);
  const selectedAnswer = document.querySelector(".answer.selected");
  if (selectedAnswer) {
    const answer = selectedAnswer.querySelector(".text").innerHTML;
    console.log(currentQuestion);
    if (answer === questions[currentQuestion - 1].correct_answer) {
      score++;
      selectedAnswer.classList.add("correct");
    } else {
      selectedAnswer.classList.add("wrong");
      const correctAnswer = document
        .querySelectorAll(".answer")
        .forEach((answer) => {
          if (
            answer.querySelector(".text").innerHTML ===
            questions[currentQuestion - 1].correct_answer
          ) {
            answer.classList.add("correct");
          }
        });
    }
  } else {
    const correctAnswer = document
      .querySelectorAll(".answer")
      .forEach((answer) => {
        if (
          answer.querySelector(".text").innerHTML ===
          questions[currentQuestion - 1].correct_answer
        ) {
          answer.classList.add("correct");
        }
      });
  }
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.classList.add("checked");
  });

  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
};

const nextQuestion = () => {
  if (currentQuestion < questions.length) {
    currentQuestion++;
    showQuestion(questions[currentQuestion - 1]);
  } else {
    showScore();
  }
};

const endScreen = document.querySelector(".end-screen"),
  finalScore = document.querySelector(".final-score"),
  totalScore = document.querySelector(".total-score"),
  circularprogress = document.querySelector(".circular-progress"),
  progresvalue = document.querySelector(".progress-value");
  
  const showScore = () => {
    endScreen.classList.remove("hide");
    quiz.classList.add("hide");
    
    finalScore.innerHTML = score;
    totalScore.innerHTML = `/ ${questions.length}`;
    
    // Update user score in local storage
    const loggedInUser = localStorage.getItem('loggedInUser');
    const userData = JSON.parse(localStorage.getItem('userData')) || [];
  
    const userIndex = userData.findIndex(user => user.username === loggedInUser);

if (userIndex !== -1) {
const currentUser = userData[userIndex];

// Check if the current score is greater than the existing score
if (score > currentUser.score) {
    // Update the score only if it's higher
    currentUser.score = score;
    localStorage.setItem('userData', JSON.stringify(userData));
}
}
  
    let progresstart = -1,
    progresend = (score/questions.length)*100,
    speed = 20;
  
    let progres = setInterval(() => {
      progresstart++;
      progresvalue.textContent = `${progresstart} %`;
      circularprogress.style.background = `conic-gradient(#c40094 ${progresstart * 3.6}deg, rgba(255,255,255,.1) 0deg)`;
      if(progresstart == progresend){
        clearInterval(progres);
  
        // Redirect to the leaderboard page after showing the final score
        setTimeout(() => {
            if (loggedInUser) {
                setTimeout(() => {
                    window.location.href = 'leaderboard.html';
                  }, 10);
            }
            
        }, 2000);
      }
    }, speed);
  };

  
/* const showScore = () => {
  endScreen.classList.remove("hide");
  quiz.classList.add("hide");
  
  finalScore.innerHTML = score;
  totalScore.innerHTML = `/ ${questions.length}`;
  
  let progresstart = -1,
  progresend = (score/questions.length)*100,
  speed = 20;

  let progres = setInterval(() => {
    progresstart++;
    progresvalue.textContent = `${progresstart} %`;
    circularprogress.style.background = `conic-gradient(#c40094 ${progresstart * 3.6}deg, rgba(255,255,255,.1) 0deg)`;
    if(progresstart == progresend){
      clearInterval(progres)

    }


  }, speed);
  
} */


const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  window.location.reload();
});



const playAdudio = (src) => {
  const audio = new Audio(src);
  audio.play();
};



