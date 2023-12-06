export default class Timeline{

    timeline_cards;
    timeline_year;

    constructor(){
        this.timeline_cards = [null, null, null, null, null];
        this.timeline_year = [null, null, null, null, null];
    }

    initTimelineYear(listOfCards){
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
    }

    getTimelineCards(){
        return this.timeline_cards;
    }

    getTimelineYears(){
        return this.timeline_year;
    }

    getSizeOfTimelineCards(){
        let size = 0;
        this.timeline_cards.forEach(card => {
            if(card != null){
                size += 1;
            }
        })
        return size;
    }

    getSizeOfTimelineYears(){
        return this.timeline_year.length
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

    checkPosition(index){
        let answer = false;
        if(this.getTimelineCards()[index].release_date == this.getTimelineYears()[index]){
            answer = true;
        }
        return answer;
    }

}