import ListOfCards from "./ListOfCards.js";

export default class Timeline{

    constructor(){
        this.timeline_cards = [null, null, null, null, null];
        this.timeline_year = [null, null, null, null, null];
    }

    initTimelineYear(listOfCards){
        console.log(listOfCards);

        for(let i = 0; i < listOfCards.length; i++){
            this.timeline_year[i] = listOfCards[i].release_date;
        }

        this.timeline_year.sort(function(a, b){
            if(a < b){
                return -1;
            }else{
                return 1;
            }
        })

        console.log(this.timeline_year);
    }

    getTimelineCards(){
        return this.timeline_cards;
    }

    getSizeOfTimelineCards(){
        return this.timeline_cards.length;
    }

    addOfTimelineCardsAt(card, index){
        let answer = false;
        if(this.timeline_cards[index] == null){
            this.timeline_cards[index] = card;
            answer = true;
        }
        return answer;
    }

    removeOfTimelineCardsAt(index){
        let answer = false;
        if(this.timeline_cards[index] != null){
            this.timeline_cards[index] = null;
            answer = true;
        }
        return answer;
    }

}