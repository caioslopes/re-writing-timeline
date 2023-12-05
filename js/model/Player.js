export default class Player{

    constructor(name){
        this.setName(name);
        this.score = 0;
        this.try = 3;
    }

    setName(name){
        if(name != ''){
            this.name = name;
        }else{
            this.name = "Guess";
        }
    }

    getName(){
        return this.name;
    }

    getScore(){
        return this.score;
    }

    decrementTry(){
        this.try -= 1;
    }

    getTry(){
        return this.try;
    }

    calculateScore(){
        this.score = this.try * 33;
    }

}