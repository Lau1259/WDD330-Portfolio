let myGoals = JSON.parse(localStorage.getItem('myGoals')) || [];
let completed;

const getPercentage = () => {
  let percent = toPercent(completed.length, myGoals.length);
  if(isNaN(percent)){
    percent = 0;
  }
  let fraction = `${completed.length} out of ${myGoals.length}`;
  let percentDisplay = document.querySelector('[data-type="percent-display"]');
  let fractionDisplay = document.querySelector('[data-type="fraction-container"]');
  switch (true) {
    case percent === 100:
      percentDisplay.classList = "percent-display complete";
      break;
    case percent >= 65:
      percentDisplay.classList = "percent-display high";
      break;
    case percent >= 30:
      percentDisplay.classList = "percent-display medium";
      break;
    default:
      percentDisplay.classList = "percent-display";
      break;
  }
  percentDisplay.innerHTML = `${percent}%`;
  fractionDisplay.innerHTML = fraction;
}

const getCompleted = (goalsList) => {
  completed = goalsList.filter(goal => goal.status !== "In Progress");
  return completed;
}

const toPercent = (num, num2) => {
  // Math.round is for integers so we multipy by 10000 to get up to 2 decimal places. Then we divide to bring it back to a number between 0-100
  let fraction = num / num2;
  return Math.round(fraction * 10000) / 100;
}

const populateCompleted = () => {
  let container = document.querySelector('#goal-stats-container');
  let html = '';
  completed.forEach(goal => {
    html += `<div class="goal-stats">
    <h2>${goal.title}</h2>
    <p>Completed in ${getDiff(new Date(goal.completedAt), new Date(goal.createdAt))}</p>
    </div>`
  });
  container.innerHTML = html;
}

getDiff = (completed, created) => {
  const diff = (completed - created) / 1000;
  let days = Math.floor(diff / 86400);
  let hours = Math.floor((diff % 86400) / 3600);
  let minutes = Math.floor(((diff % 86400) % 3600) / 60);
  let seconds = parseInt(((diff % 86400) % 3600) % 60);
  return `${days} ${days === 1 ? "day":"days"} ${hours} ${hours === 1 ? "hour":"hours"} ${minutes} ${minutes === 1 ? "minute":"minutes"} ${seconds} ${seconds === 1 ? "second":"seconds"}`;
}


getCompleted(myGoals);
getPercentage();
populateCompleted();