const selectElement = document.getElementById("choose");
const selectElementShow = document.getElementById("choose-show");
const searchElement = document.getElementById("search-input");
const numberOfEpisodes = document.getElementById("episodes-number");
const rootElem = document.getElementById("root");
const allEpisodes = getAllEpisodes();
const shows = getAllShows();

function setup() {
  fetch("https://api.tvmaze.com/shows/82/episodes")
    .then((response) => response.json())
    .then((data) => {
      makePageForEpisodes(data);
      addOptions(data);
      searchEpisodes(data);
      chooseAnEpisode(data);
    })
    .catch((error) => console.log(error));
  chooseShow();
}
// level 100
function makePageForEpisodes(episodeList) {
  episodeList.forEach((episode) => addEpisode(episode));
  numberOfEpisodes.innerText = episodeList.length;
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
  imgEpisode.src = episode.image.medium;
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
function addOptionsShow() {
  let showTitles = shows.map((show) => show.name).sort();
  showTitles.forEach((show) => {
    const optionElement = document.createElement("option");
    optionElement.innerHTML = show;
    selectElementShow.appendChild(optionElement);
  });
}
addOptionsShow();

function chooseAnEpisode(episodes) {
  selectElement.addEventListener("change", (event) => {
    const inputValue = event.target.value;
    rootElem.textContent = "";
    const filteredEpisodes = episodes.filter((episode) =>
      inputValue.includes(episode.name)
    );
    makePageForEpisodes(filteredEpisodes);
    buttonBackToAllEpisodes(allEpisodes);
  });
}
function chooseShow() {
  selectElementShow.addEventListener("change", (event) => {
    const inputValue = event.target.value;

    rootElem.textContent = "";

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

window.onload = setup;
