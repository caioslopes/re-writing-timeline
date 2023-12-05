import Card from "./Card.js";

export default class ListOfCards{

    constructor(){
        this.listOfCards = [];
    }

    getListOfCards(){
        return this.listOfCards;
    }

    getCardById(id){
        let answer = null;
        this.listOfCards.forEach(item =>{
            if(item.id == id){
                answer = item;
            }
        })
        return answer;
    }

    getSizeListOfCards(){
        return this.listOfCards.length;
    }

    async #increasingListOfCards(){
        const card = new Card();
        await card.createCard();

        if(this.getSizeListOfCards() == 0){
            this.listOfCards.push(card.getCard());
        }else{
            if(this.#dateAlreadyExist(card.getCard().release_date)){
                this.#increasingListOfCards();
            }else{
                this.listOfCards.push(card.getCard());
            }
        }
    } 

    #dateAlreadyExist(date){
        let answer = false;
        this.listOfCards.forEach( item => {
            if(item.release_date == date){
                answer = true;
            }
        } )
        return answer;
    }

    async initListOfCards(){
        for(let i = 0; i < 5; i++){
            await this.#increasingListOfCards();
        }
    }

}