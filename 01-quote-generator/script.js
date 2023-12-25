const quoteContainer = document.getElementById("quote-container");
const authorText = document.getElementById("author");
const quoteText = document.getElementById("quote");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

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

// Get Quote from API
async function getQuote() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    const quotes = await response.json();
    const data = quotes[Math.floor(Math.random() * quotes.length)];

    // If author is blank, add "unknown" to the author field
    if (data.author === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.author;
    }

    // Reduce the font size of long quotes
    if (data?.text.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.text;

    // Stop loader, show the quote
    removeLoadingSpinner();
  } catch (error) {
    getQuote();
  }
}

// Event Listeners
newQuoteButton.addEventListener("click", getQuote);

// On Load
getQuote();
