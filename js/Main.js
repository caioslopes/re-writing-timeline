import Api from "./model/Api.js"
import Card from "./model/Card.js";
import ListOfCards from "./model/ListOfCards.js";
import Timeline from "./model/Timeline.js";

const api = new Api();

api.showOnLog("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&primary_release_year=1960&region=BR%2CUS&sort_by=popularity.desc");

const game = new ListOfCards();

await game.initListOfCards();

console.log(game.getListOfCards()[1]);

const timeline = new Timeline();

timeline.initTimelineYear(game.getListOfCards());

timeline.addOfTimelineCardsAt(game.getListOfCards()[0], 0);
timeline.addOfTimelineCardsAt(game.getListOfCards()[1], 1);
timeline.addOfTimelineCardsAt(game.getListOfCards()[2], 2);
timeline.addOfTimelineCardsAt(game.getListOfCards()[3], 3);
timeline.addOfTimelineCardsAt(game.getListOfCards()[4], 4);

console.log(timeline.getTimelineCards());
console.log(timeline.getTimelineYears());

if(timeline.checkPosition(0)){
    console.log("É igual");
}else{
    console.log("Não é igual");
}

/* timeline.removeOfTimelineCardsAt(0);

console.log(timeline.getTimelineCards()); */

