const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuotebtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API

async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const apiUrl =
  'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // If author is blank, add 'Unknown author'
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown Author';
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    //Reduce font size for long quotes
    if (data.quoteText.length > 120  ) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    // Stop loader, show quote
    removeLoadingSpinner();
  } catch (error) {
    getQuote();
    console.log("whoops, no quote", error);
  }
}

// Tweet Quote
function tweetQuote(){
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank'); 
}

// Event listeners
newQuotebtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
  getQuote();
 


// //Get Quote From API
// async function getQuote() {
//     const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
//     const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
//     try {
//         const response = await fetch(proxyUrl + apiUrl)
//         const data = await response.json();
//         console.log(data)
//     }
//     catch (error) {
//         console.error('Whoops, no quote ', error);
//     }
// }
// // On Load
// getQuote();