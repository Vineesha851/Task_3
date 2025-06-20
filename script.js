// === Background Color Changer ===
const bgColors = ['#fefae0', '#e0f7fa', '#f3f0ff', '#e8f5e9', '#fffde7'];
let colorIndex = 0;
setInterval(() => {
  document.body.style.backgroundColor = bgColors[colorIndex];
  colorIndex = (colorIndex + 1) % bgColors.length;
}, 4000);

// === Carousel ===
const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1496483648148-47c686dc86a8"
];
let currentIndex = 0;

function updateImage() {
  document.getElementById("carousel-image").src = images[currentIndex] + "?w=800";
}
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
}
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
}
updateImage();

// === Quiz Logic ===
const quizData = [
  {
    question: "Which is the largest rainforest in the world?",
    answers: [
      { text: "Amazon Rainforest", correct: true },
      { text: "Congo Rainforest", correct: false },
      { text: "Southeast Asian Rainforest", correct: false },
      { text: "Daintree Rainforest", correct: false }
    ]
  },
  {
    question: "What is the tallest type of tree in the world?",
    answers: [
      { text: "Sequoia", correct: false },
      { text: "Douglas Fir", correct: false },
      { text: "Coast Redwood", correct: true },
      { text: "Baobab", correct: false }
    ]
  },
  {
    question: "Which animal is known as the 'ship of the desert'?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Camel", correct: true },
      { text: "Horse", correct: false },
      { text: "Donkey", correct: false }
    ]
  }
];

let currentQuizIndex = 0;

function loadQuiz() {
  const q = quizData[currentQuizIndex];
  document.getElementById("question").textContent = q.question;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  document.getElementById("quiz-result").textContent = "";

  q.answers.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option.text;
    btn.onclick = () => {
      const result = document.getElementById("quiz-result");
      if (option.correct) {
        result.textContent = "✅ Correct!";
        result.style.color = "green";
      } else {
        result.textContent = "❌ Try again!";
        result.style.color = "red";
      }
    };
    answersDiv.appendChild(btn);
  });

  document.getElementById("next-btn").style.display = 
    currentQuizIndex < quizData.length - 1 ? "inline-block" : "none";
}

function nextQuestion() {
  if (currentQuizIndex < quizData.length - 1) {
    currentQuizIndex++;
    loadQuiz();
  }
}
loadQuiz();

// === Joke Fetcher ===
function fetchJoke() {
  const jokeEl = document.getElementById("joke");
  jokeEl.textContent = "Loading...";
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => {
      jokeEl.textContent = `${data.setup} — ${data.punchline}`;
    })
    .catch(() => {
      jokeEl.textContent = "Couldn't load a joke, sorry!";
    });
}
