import Card from "./Card.js";

export default class ListOfCards{

    listOfCards;

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
        let answer = true
        const card = new Card();
        await card.createCard();

        if(this.getSizeListOfCards() == 0){
            this.listOfCards.push(card.getCard());
        }else{
            if(!this.#dateAlreadyExist(card.getCard().release_date)){
                this.listOfCards.push(card.getCard());
            }else{
                answer = false
            }
        }
        return answer
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
        let flag = false
        for(let i = 0; i < 5; i++){
            do{
                flag = await this.#increasingListOfCards();
            }while(flag == false);
        }
    }

}