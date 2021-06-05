let apiSource = "https://api.quotable.io/random";

const getQuote = () => fetch(apiSource)
  .then(response => {
    return response.json()
  })
  .then(quote => {
    displayQuote(quote);
  });

const displayQuote = (quote) => {
  let container = document.querySelector('#quote-container');
  let tags = "";
  quote.tags.forEach(tag => {
    tags += `<p class="tag">${tag}</p>`
  });
  container.innerHTML =
    `<div class="quote">
  <p class="content"><span class="flare">“</span>${quote.content}<span class="flare">”</span> <span class="author">- ${quote.author}</span></p>
  </div><div class="info">${tags}</div>
    <input type="button" class="action" value="Get another quote" onclick="getQuote()">`;
  container.scrollIntoView();
}


/**********************************************************
 Function stuff
**********************************************************/
function greeting() {
  let name = prompt('Please enter your name below:');
  let btn = document.querySelector('#runGreeting');
  btn.value = "I've evolved! Try running me again!";
  greeting = function () {
    let message = document.querySelector('#message');
    message.innerHTML = `<p>Welcome ${name}! Since we've already met I won't ask you for your name again.`;
    message.scrollIntoView();
  }
}