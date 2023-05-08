//You can edit ALL of the code here
let rootElem = document.getElementById("root");
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  episodeList.forEach((episode) => addEpisode(episode));
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

setup();
window.onload = setup;
