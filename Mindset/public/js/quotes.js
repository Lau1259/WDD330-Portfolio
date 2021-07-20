import Quote from "./Quote.js";

/**********************************************************
TO DO:

1) Create modal for quotes. I want to keep track of a few but not on local storage.

2) Set up local Storage for favorites

3) Set up logic for reasons. This includes adding new reasons and deleting old ones. I want less logic here, but the css animation should be used to slide something in and then slide another out. I'll have to decide if I just reverse an animation or if I want to make another animation and trigger it with JS.

4) Set up progress site. It should be an informational part of the app. This is more like numerical data represented by charts. This can include things like how many goals I've completed. Avg. Time to complete a goal (This would required storing a creation date and update date in the goal). Number of times you've asked for a quote. Reason added.
**********************************************************/

const quoteContainer = document.querySelector('#quotes-container');

const url = `https://api.quotable.io/random?tags=inspirational%7Csuccess'`;

const getQuote = async () => {
  fetch(url)
    .then(res => res.json())
    .then(quote => {
      let newQuote = new Quote(
        quote._id,
        quote.content,
        quote.author,
        quote.authorSlug
      )
      quoteContainer.innerHTML = newQuote.toHTML();
      return quoteContainer;
    })
  toggleQuoteBtn(true);
}

const enableQuote = () => {
  let btn = document.querySelector('[data-type="get-quote"');
  btn.addEventListener('click', getQuote);
}

const closeQuote = () => {
  quoteContainer.innerHTML = '';
  console.log('Closing..')
  toggleQuoteBtn(false);
}

const toggleQuoteBtn = (on) => {
  let btn = document.querySelector('[data-type="get-quote"');
  if (on) {
    btn.removeEventListener('click', getQuote);
    btn.addEventListener('click', closeQuote);
    btn.innerHTML = "Close Quote";
  } else {
    btn.removeEventListener('click', closeQuote);
    btn.addEventListener('click', getQuote);
    btn.innerHTML = "Get New Quote";
  }
}

enableQuote()