const API_KEY = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
// in the url api key hits
const url = "https://newsapi.org/v2/everything?q=";

// in windo there is an load event which is used when it load it shoud call a callback function which is fetchNews which initially fetch news of India
window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    // The fetch() method in JavaScript is used to request data from a server. The request can be of any type of API that returns the data 
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    // `${url}${query}&apiKey=${API_KEY} this brings a proper string which is required for reqsting data
    const data = await res.json(); //we use await because it returns a promise
    // the process that couples two data sources together and synchronizes them
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
//when bind data call we just empty the cardsContainer
    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        // The cloneNode() method in JavaScript makes a duplicate of the node object that is sent in and delivers the clone node object.
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

// these keys we get from api
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",//for pinting date
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        // when we click on any element
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
// id==search query
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    // classList JavaScript is a read-only property that is used to return CSS classes in the form of an array
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value; // extract the query from input
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});