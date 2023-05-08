//You can edit ALL of the code here
let selectElement = document.getElementById("choose");
let searchElement = document.getElementById("search-input");
let numberOfEpisodes = document.getElementById("episodes-number");
let rootElem = document.getElementById("root");
const allEpisodes = getAllEpisodes();
function setup() {
  makePageForEpisodes(allEpisodes);
  addOptions();
  numberOfEpisodes.innerText = allEpisodes.length;
  searchEpisodes();
  chooseAnEpisode();
}
// level 100
function makePageForEpisodes(episodeList) {
  episodeList.forEach((episode) => addEpisode(episode));
  numberOfEpisodes.innerText = episodeList.length;
}
function addEpisode(episode) {
  let episodeContainer = document.createElement("div");
  episodeContainer.classList.add("episode-container");
  let title = document.createElement("h3");
  title.classList.add("episode-title");
  let imgEpisode = document.createElement("img");
  imgEpisode.classList.add("episode-image");
  let summaryText = document.createElement("p");
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
function searchEpisodes() {
  searchElement.addEventListener("input", (event) => {
    const inputValue = event.target.value.toLowerCase();
    rootElem.textContent = "";

    const filteredEpisodes = allEpisodes.filter((episode) => {
      return (
        episode.summary.toLowerCase().includes(inputValue.toLowerCase()) ||
        episode.name.toLowerCase().includes(inputValue.toLowerCase())
      );
    });
    makePageForEpisodes(filteredEpisodes);
  });
}
// level 300
function addOptions() {
  allEpisodes.forEach((episode) => {
    let optionElement = document.createElement("option");
    optionElement.innerHTML = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
      episode.name
    }`;
    selectElement.appendChild(optionElement);
  });
}
function chooseAnEpisode() {
  selectElement.addEventListener("change", (event) => {
    const inputValue = event.target.value;
    rootElem.textContent = "";
    const filteredEpisodes = allEpisodes.filter((episode) =>
      inputValue.includes(episode.name)
    );
    makePageForEpisodes(filteredEpisodes);
  });
}
window.onload = setup;
