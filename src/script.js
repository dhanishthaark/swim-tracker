const resultForm = document.getElementById("resultForm");
const resultsList = document.getElementById("resultsList");
const pbList = document.getElementById("pbList");

let results = JSON.parse(localStorage.getItem("swimResults")) || [];

function saveResults() {
  localStorage.setItem("swimResults", JSON.stringify(results));
}


function displayResults() {
  resultsList.innerHTML = "";

  const recentResults = [...results]
  .sort((a,b) => new Date(b.date) - new Date(a.date))
  .slice(0,8);

  recentResults.forEach((result) => {
   const resultElement = document.createElement("div");
   resultElement.className = "result-row";

   resultElement.innerHTML = `
    <div>
      <strong>${result.distance} ${result.stroke}</strong>
      <span>${result.date} · ${result.sessionType}</span>
    </div>
    <strong class="result-time">${result.time}</strong>
   `;

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
   const pbElement = document.createElement("div");
   pbElement.className = "pb-card";
   pbElement.innerHTML = `
     <span class="pb-event">${result.distance} ${result.stroke}</span>
     <strong class="pb-time">${result.time}</strong>
     <span class="pb-label">Personal best</span>
   `;
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
