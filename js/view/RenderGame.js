import Game from "../model/Game.js"

export default class RenderGame{

    static dragging = false;
    static playing; // 0 == playing; -1 == defeat;

    constructor(){
        this.content = document.querySelector("#content");
    }

    static updatePlaying(player){
        if(player.getTry() == 0){
            this.playing = -1;
        }else{
            this.playing = 0;
        }
    }

    /* Render Methods */
    renderCard(ListOfCards){
        const pos = document.querySelector("#cards");
        const template_card = document.getElementById("template_card");
        ListOfCards.getListOfCards().forEach( film =>{
            const div = template_card.content.cloneNode(true);
            div.querySelector("img").src = "https://image.tmdb.org/t/p/w300"+film.poster_path;
            div.querySelector("img").alt = film.title;
            div.querySelector("img").setAttribute("data-film", film.id);
            pos.append(div);
        });
    }

    static updateListOfCards(timeline, list){
        timeline.getTimelineCards().forEach(card => {
            if(card != null){
                list.forEach(item => {
                    if(item.querySelector("img").getAttribute("data-film") == card.id){
                        item.classList.add("invisible");
                    }
                })
            }
        })
    }

    static recoverCard(list, id){
        list.forEach(item => {
            if(item.querySelector("img").getAttribute("data-film") == id){
                item.classList.remove("invisible");
            }
        })
    }

    renderSlot(timeline){
        const pos = document.querySelector("#timeline");
        const template_slot = document.getElementById("template_slot");
    
        timeline.getTimelineYears().forEach(item => {
            const template = template_slot.content.cloneNode(true);
            template.querySelector("span").innerText = item;
            pos.append(template);
        })
    }

    static renderSlotCard(timeline){
        const slot = document.querySelectorAll(".slot");
        const template_card = document.getElementById("template_card");

        timeline.getTimelineCards().forEach(function(card, index){
            if(card != null){
                const div = template_card.content.cloneNode(true);
                div.querySelector("img").src = "https://image.tmdb.org/t/p/w300"+card.poster_path;
                div.querySelector("img").alt = card.title;
                div.querySelector("img").setAttribute("data-film", card.id);
                if(!slot[index].querySelector(".card")){
                    slot[index].append(div);
                    slot[index].querySelector("svg").classList.add("invisible");
                }
            }else{
                if(slot[index].querySelector(".card")){
                    slot[index].querySelector(".card").remove();
                    slot[index].querySelector("svg").classList.remove("invisible");
                }
            }
        });
    }

    /* Drag Methods */
    dragStart(e){
        e.dataTransfer.setData("id", e.target.getAttribute("data-film"));
        RenderGame.dragging = true;
        setTimeout(() => {
            this.classList.add("invisible");
        }, 0);
    }

    dragEnd(){
        if(RenderGame.dragging){
            this.classList.remove("invisible");
        }
    }

    /* Player */
    static showOnLogPlayer(game){
        console.log(game.player.getName());
        console.log(game.player.getTry());
        console.log(game.player.getScore());
    }

    static renderHeart(player){
        const pos = document.querySelector("#try");
        for(let i = 0; i < player.getTry(); i++){
            const img = document.createElement("img");
            img.className = "icon_heart"
            img.src = "/assets/heart.svg";
            pos.append(img);
        }
    }

    static updateHeart(player){
        const hearts = document.querySelectorAll(".icon_heart");

        let i = 0;
        while(i < player.getTry()){
            i++;
        }

        hearts[i].classList.add("heart_low");
    }

    static renderScore(player){
        const score = document.querySelector("#score");
        score.innerText = player.getScore();
    }

    async renderGame(){
        const game = new Game("Zé");
        await game.initGame();

        this.renderCard(game.listOfCards);
        this.renderSlot(game.timeline);

        RenderGame.renderHeart(game.player);
        RenderGame.renderScore(game.player);
        RenderGame.updatePlaying(game.player);

        const dragItems = document.querySelectorAll(".card");
        const dropSlots = document.querySelectorAll(".slot");
        const submit = document.querySelector("#submit");

        submit.addEventListener("click", () => {
            if(RenderGame.playing == 0){
                if(game.timeline.getSizeOfTimelineCards() == game.listOfCards.getSizeListOfCards()){
                    if(game.checkTimeline(game.timeline)){
                        dropSlots.forEach(slot => {
                            slot.querySelector(".card").classList.add("correct_card");
                            slot.querySelector(".card").querySelector("img").classList.add("correct");
                        })
                    }else{
                        dropSlots.forEach(function(slot, index) {
                            if(!game.timeline.checkPosition(index)){
                                slot.querySelector(".card").querySelector("img").classList.add("wrong");
                            }else{
                                slot.querySelector(".card").classList.add("correct_card");
                                slot.querySelector(".card").querySelector("img").classList.add("correct");
                            }
                        })
                    }
                    RenderGame.showOnLogPlayer(game);
                    RenderGame.updateHeart(game.player);
                    RenderGame.renderScore(game.player);
                }else{
                    alert("Preencha toda a timeline!");
                }
            }else{
                alert("Perdeu");
            }
        })

        dragItems.forEach(item => {
            item.addEventListener("dragstart", this.dragStart);
            item.addEventListener("dragend", this.dragEnd);
        })

        dropSlots.forEach(function(slot, index){
            slot.addEventListener("dragstart", (e) =>{
                RenderGame.dragging = true;
                e.dataTransfer.setData("id", e.target.getAttribute("data-film"));

                game.timeline.removeOfTimelineCardsAt(index);
                slot.classList.remove("wrong");
                
                setTimeout(() => {
                    slot.querySelectorAll(".card").forEach(card =>{
                        card.classList.add("invisible");
                    })
                }, 0);
                
        
            });
            slot.addEventListener("dragover", (e)=>{
                e.preventDefault();
                slot.classList.add("over");
            });
            slot.addEventListener("drop", (e)=>{
                RenderGame.dragging = false;
                e.preventDefault();
                slot.classList.remove("over");

                const id = e.dataTransfer.getData("id");
                let card = game.listOfCards.getCardById(id);

                if(!game.timeline.addOfTimelineCardsAt(card, index)){
                    RenderGame.recoverCard(dragItems, id);
                }
                RenderGame.renderSlotCard(game.timeline);
                RenderGame.updateListOfCards(game.timeline, dragItems);
        
            });
            slot.addEventListener("dragleave", (e) => {
                e.preventDefault();
                slot.classList.remove("over");
            });
            slot.addEventListener("dragend", () => {
                let id = slot.querySelector("img").getAttribute("data-film");
                RenderGame.recoverCard(dragItems, id);
                RenderGame.renderSlotCard(game.timeline);
            })
        })
    }
}