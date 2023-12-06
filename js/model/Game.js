import Player from "./Player.js"
import ListOfCards from "./ListOfCards.js";
import Timeline from "./Timeline.js"

export default class Game{

    constructor(name){
        this.player = new Player(name);
        this.listOfCards = new ListOfCards();
        this.timeline = new Timeline();
    }

    async initGame(){
        await this.listOfCards.initListOfCards();
        this.timeline.initTimelineYear(this.listOfCards.getListOfCards());
    }

    checkTimeline(timeline){
        let correct = true;
        let i = 0;

/*       for(let i = 0; i < timeline.getSizeOfTimelineYears() && correct; i++){

        } */

        while(i < timeline.getSizeOfTimelineYears() && correct == true){
            if(!timeline.checkPosition(i)){
                correct = false;
                break;
            }
            i++;
        }

        if(correct){
            this.player.calculateScore();
        }else{
            this.player.decrementTry();
        }

        return correct;
    }

}