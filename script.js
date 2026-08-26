const form = document.getElementById("quizForm");
const questions = document.querySelectorAll(".question");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitBtn");
const resultDiv = document.getElementById("result");
const retakeBtn = document.getElementById("retakeBtn");


let currentQuestion = 0;

function showQuestion(index) {
  questions.forEach((q, i) => {
    q.style.display = i === index ? "block" : "none";
  });

  prevBtn.disabled = index === 0;
  nextBtn.style.display = index < questions.length - 1 ? "inline" : "none";
  submitBtn.style.display = index === questions.length - 1 ? "inline" : "none";
  updateProgressBar();
}

function updateProgressBar() {
  const progressBar = document.getElementById("progressBar");
  const percentage = ((currentQuestion + 1) / questions.length) * 100;
  progressBar.style.width = `${percentage}%`;
}

showQuestion(currentQuestion);

nextBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion(currentQuestion);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion(currentQuestion);
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const counts = {
    rama: 0,
    krishna: 0,
    saraswati: 0,
    hanuman: 0,
  };

  for (let [name, value] of formData.entries()) {
    if (counts[value] !== undefined) {
      counts[value]++;
    }
  }

  let result = "Undetermined";
  let max = 0;
  for (let key in counts) {
    if (counts[key] > max) {
      max = counts[key];
      result = key;
    }
  }

  let description = "";
  switch (result) {
    case "rama":
      description = "You are like Lord Rama – righteous, disciplined, and an ideal leader.";
      break;
    case "krishna":
      description = "You are like Lord Krishna – joyful, strategic, and full of wisdom.";
      break;
    case "saraswati":
      description = "You are like Goddess Saraswati – wise, calm, and a seeker of knowledge.";
      break;
    case "hanuman":
      description = "You are like Lord Hanuman – strong, devoted, and loyal.";
      break;
    default:
      description = "Your personality is a unique blend of many qualities!";
  }

  form.style.display = "none";
  resultDiv.innerHTML = `<h2>Your Personality: ${result.toUpperCase()}</h2><p>${description}</p>`;
  resultDiv.classList.add("show");

  retakeBtn.style.display = "inline-block";
});

retakeBtn.addEventListener("click", () => {

  currentQuestion = 0;

  questions.forEach((question) => {
    const inputs = question.querySelectorAll("input[type=radio]");
    inputs.forEach((input) => (input.checked = false));
  });

  showQuestion(currentQuestion);

  form.style.display = "block";
  resultDiv.classList.remove("show");
  resultDiv.innerHTML = "";
  retakeBtn.style.display = "none";

  updateProgressBar();
});
