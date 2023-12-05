import Player from "./Player"
import ListOfCards from "./ListOfCards";
import Timeline from "./Timeline"

export default class Game{

    constructor(name){
        this.player = new Player(name);
        this.listOfCards = new ListOfCards();
        this.timeline = new Timeline();
    }

    async initGame(){
        await this.listOfCards.initListOfCards();
        this.timeline.initTimelineYear();
    }

    checkingTimeline(timeline){
        
    }

}