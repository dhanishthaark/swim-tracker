const resultForm = document.getElementById("resultForm");
const resultsList = document.getElementById("resultsList");
const pbList = document.getElementById("pbList");

let results = JSON.parse(localStorage.getItem("swimResults")) || [];

function saveResults() {
  localStorage.setItem("swimResults", JSON.stringify(results));
}

function displayResults() {
  resultsList.innerHTML = "";

  results.forEach((result) => {
    const resultElement = document.createElement("p");

    resultElement.textContent =
      `${result.date} | ${result.distance} ${result.stroke} | ${result.time} | ${result.sessionType}`;

    resultsList.appendChild(resultElement);
  });
}

function calculatePersonalBests() {
  const personalBests = {};

  results.forEach((result) => {

    const key = `${result.distance}-${result.stroke}`;

    if (
      !personalBests[key] ||
      result.timeSeconds < personalBests[key].timeSeconds
    ) {
      personalBests[key] = result;
    }

  });

  return personalBests;
}

function displayPersonalBests() {
  pbList.innerHTML = "";

  const personalBests = calculatePersonalBests();

  Object.values(personalBests).forEach((result) => {

    const pbElement = document.createElement("p");

    pbElement.textContent =
      `${result.distance} ${result.stroke}: ${result.time}`;

    pbList.appendChild(pbElement);

  });
}

function convertTimeToSeconds(time) {

  const parts = time.split(":");

  if (parts.length === 2) {
    const minutes = Number(parts[0]);
    const seconds = Number(parts[1]);

    return minutes * 60 + seconds;
  }

  return Number(time);
}

resultForm.addEventListener("submit", (event) => {

  event.preventDefault();

  const date = document.getElementById("date").value;
  const stroke = document.getElementById("stroke").value;
  const distance = document.getElementById("distance").value;
  const time = document.getElementById("time").value;
  const sessionType = document.getElementById("sessionType").value;

  const newResult = {
    date,
    stroke,
    distance,
    time,
    timeSeconds: convertTimeToSeconds(time),
    sessionType
  };

  results.push(newResult);

  saveResults();

  displayResults();
  displayPersonalBests();

  resultForm.reset();
});

displayResults();
displayPersonalBests();
