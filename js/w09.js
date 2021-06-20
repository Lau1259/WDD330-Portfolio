const form = document.forms[0];

const fibonacci = (e) => {
  e.preventDefault();
  const n = Number(form.fnum.value);
  const isMem = Number(form.memoization.checked);
  const output = document.getElementById('fOutput');
  output.innerHTML = '<p>This could take a while ...</p>';

  if (window.Worker) {
    const worker = new Worker('../js/fibonacci.js');
    worker.postMessage([n, isMem]);
    worker.addEventListener('message', (event) => {
      output.innerHTML = `The Fibonacci number is: ${event.data}`;
      output.classList = 'success';
      output.style.color = 'black';
      output.scrollIntoView({
        block: "end",
        behavior: "smooth"
      });
    }, false);
  }
}

form.addEventListener('submit', fibonacci, false);

const bInfo = document.getElementById("browserInfo");
let browser = window.navigator.userAgent;
let screenW = window.screen.width
let screenY = window.screen.height;
let host = window.location.hostname;
bInfo.innerHTML = `
<li>Current Browser Information: ${browser}</li>
<li>Current Screen Width: ${screenW}</li>
<li>Current Screen Height: ${screenY}</li>
<li>Current web page: ${host}</li>
`;