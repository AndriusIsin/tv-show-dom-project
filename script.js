const selectElement = document.getElementById("choose");
const selectElementShow = document.getElementById("choose-show");
const searchElement = document.getElementById("search-input");
const numberOfEpisodes = document.getElementById("displaying-episodes");
const rootElem = document.getElementById("root");
const rootElemShow = document.getElementById("root-shows");

const allEpisodes = getAllEpisodes();
const shows = getAllShows();
const oneShow = getOneShow();
const starUrl =
  "https://www.citypng.com/public/uploads/preview/hd-orange-star-transparent-background-116590439195j8drukpqu.png";

function setup() {
  searchShows();
  addOptionsShow();
  chooseShow(selectElementShow, "change");
  numberOfEpisodes.innerText = `found ${shows.length} shows`;
  showAllShows(shows);

  // fetchEpisodes();
}
// level 100
function makePageForEpisodes(episodeList) {
  selectElementShow.style.display = "inline";
  selectElement.style.display = "inline";
  rootElemShow.textContent = "";
  episodeList.forEach((episode) => addEpisode(episode));
  numberOfEpisodes.innerText = `found ${episodeList.length} episodes`;
}
function addEpisode(episode) {
  const episodeContainer = document.createElement("div");
  episodeContainer.classList.add("episode-container");
  const title = document.createElement("h3");
  title.classList.add("episode-title");
  const imgEpisode = document.createElement("img");
  imgEpisode.classList.add("episode-image");
  const summaryText = document.createElement("p");
  summaryText.classList.add("episode-summary");
  title.innerHTML = `${episode.name} - S${episode.season
    .toString()
    .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}
`;
  if (episode.image !== null) {
    imgEpisode.src = episode.image.medium;
  }
  imgEpisode.alt = episode.name;
  summaryText.innerHTML = episode.summary;
  episodeContainer.append(title, imgEpisode, summaryText);
  rootElem.append(episodeContainer);
}
// level 200
function searchEpisodes(episodes) {
  searchElement.addEventListener("input", (event) => {
    const inputValue = event.target.value;
    rootElem.textContent = "";

    const filteredEpisodes = episodes.filter((episode) => {
      return (
        episode.summary.toLowerCase().includes(inputValue.toLowerCase()) ||
        episode.name.toLowerCase().includes(inputValue.toLowerCase())
      );
    });
    makePageForEpisodes(filteredEpisodes);
    numberOfEpisodes.innerText = `found ${filteredEpisodes.length} episodes`;
  });
}
// level 300
function addOptions(episodes) {
  selectElement.innerHTML = "";
  episodes.forEach((episode) => {
    const optionElement = document.createElement("option");
    optionElement.innerHTML = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
      episode.name
    }`;
    selectElement.appendChild(optionElement);
  });
}
function buttonBackToAllEpisodes(episodes) {
  const backButton = document.createElement("button");
  backButton.classList.add("back-button");
  backButton.innerText = "Show all episodes";
  rootElem.appendChild(backButton);
  backButton.addEventListener("click", (event) => {
    rootElem.textContent = "";
    makePageForEpisodes(episodes);
    backButton.remove();
  });
}
//level 350

function fetchEpisodes(episodeNumber) {
  fetch(`https://api.tvmaze.com/shows/${episodeNumber}/episodes`)
    .then((response) => response.json())
    .then((data) => {
      makePageForEpisodes(data);
      addOptions(data);
      searchEpisodes(data);
      chooseAnEpisode(data);
    })
    .catch((error) => console.log(error));
}
//Level 400
function addOptionsShow() {
  let showTitles = shows.map((show) => show.name).sort();
  showTitles.forEach((show) => {
    const optionElement = document.createElement("option");
    optionElement.innerHTML = show;
    selectElementShow.appendChild(optionElement);
  });
}

function chooseAnEpisode(episodes) {
  selectElement.addEventListener("change", (event) => {
    const inputValue = event.target.value;
    rootElem.textContent = "";
    const filteredEpisodes = episodes.filter((episode) =>
      inputValue.includes(episode.name)
    );
    makePageForEpisodes(filteredEpisodes);
    buttonBackToAllEpisodes(episodes);
  });
}
function chooseShow(classOrId, eventListener) {
  classOrId.addEventListener(eventListener, (event) => {
    const inputValue = event.target.value;

    rootElem.textContent = "";
    rootElemShow.textContent = "";
    let filteredShow = shows.filter((show) => show.name === inputValue);

    fetch(`https://api.tvmaze.com/shows/${filteredShow[0].id}/episodes`)
      .then((response) => response.json())
      .then((data) => {
        makePageForEpisodes(data);
        addOptions(data);
        searchEpisodes(data);
        chooseAnEpisode(data);
      })
      .catch((error) => console.log(error));
  });
}

//Level 500
function showAllShows(shows) {
  selectElementShow.style.display = "inline";
  selectElement.style.display = "none";
  shows.forEach((show) => {
    const showContainer = document.createElement("div");
    showContainer.classList = "main-show-container";
    const titleRatingContainer = document.createElement("div");
    titleRatingContainer.classList = "title-rating-container";
    const showTitle = document.createElement("h1");
    showTitle.classList = "show-title";
    showTitle.innerText = show.name;
    const ratingNumber = document.createElement("h5");
    ratingNumber.classList = "rating-number";
    ratingNumber.innerText = `⭐ ${show.rating.average}`;
    titleRatingContainer.appendChild(showTitle);
    titleRatingContainer.appendChild(ratingNumber);

    const aboutShow = document.createElement("div");
    aboutShow.classList = "about-show";
    aboutShow.innerHTML = `
   <h6 class="about-show-details">Genres: ${show.genres}</h6>
   <h6 class="about-show-details">Status: ${show.status}</h6>
   <h6 class="about-show-details">Runtime: ${show.runtime}</h6>`;

    const aboutShowContainer = document.createElement("div");
    aboutShowContainer.classList = "about-show-container";
    const image = document.createElement("img");
    image.classList = "show-image";
    if (show.image !== null) {
      image.src = show.image.medium;
    }
    const about = document.createElement("p");
    about.innerHTML = `${show.summary}`;

    aboutShowContainer.appendChild(image);
    aboutShowContainer.appendChild(about);
    aboutShowContainer.appendChild(aboutShow);
    showContainer.appendChild(titleRatingContainer);
    showContainer.appendChild(aboutShowContainer);
    rootElemShow.appendChild(showContainer);
    image.addEventListener("click", function () {
      fetchEpisodes(show.id);
    });
    showTitle.addEventListener("click", function () {
      fetchEpisodes(show.id);
    });
  });
}
function searchShows() {
  searchElement.addEventListener("input", (event) => {
    const inputValue = event.target.value;
    rootElemShow.textContent = "";
    const filteredShows = shows.filter((show) => {
      return (
        show.summary.toLowerCase().includes(inputValue.toLowerCase()) ||
        show.name.toLowerCase().includes(inputValue.toLowerCase())
      );
    });
    showAllShows(filteredShows);
    numberOfEpisodes.innerText = `found ${filteredShows.length} shows`;
  });
}
const showTitles = document.querySelectorAll(".show-title");
showTitles.forEach((title) => console.log(title.value));
console.log(showTitles);
window.onload = setup;
