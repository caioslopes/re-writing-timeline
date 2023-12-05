import Api from "./model/Api.js"
import Card from "./model/Card.js";
import ListOfCards from "./model/ListOfCards.js";
import Timeline from "./model/Timeline.js";

const api = new Api();

api.showOnLog("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&primary_release_year=1960&region=BR%2CUS&sort_by=popularity.desc");

const card = new Card();

await card.createCard();

console.log(card.getCard()); 

const game = new ListOfCards();

await game.initListOfCards();

console.log(game.getListOfCards());

const timeline = new Timeline();

timeline.initTimelineYear(game.getListOfCards());

timeline.addOfTimelineCardsAt(card.getCard(), 0);
timeline.addOfTimelineCardsAt(card.getCard(), 1);
timeline.addOfTimelineCardsAt(card.getCard(), 2);

console.log(timeline.getTimelineCards());

/* timeline.removeOfTimelineCardsAt(0);

console.log(timeline.getTimelineCards()); */

