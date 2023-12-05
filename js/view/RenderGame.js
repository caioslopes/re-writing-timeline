import Game from "../model/Game.js"

export default class RenderGame{

    constructor(){
        this.content = document.querySelector("#content"); 
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

    renderSlot(timeline){
        const pos = document.querySelector("#timeline");
        const template_slot = document.getElementById("template_slot");
    
        timeline.getTimelineYears().forEach(item => {
            const template = template_slot.content.cloneNode(true);
            template.querySelector("span").innerText = item;
            pos.append(template);
        })
    }

    /* Drag Methods */
    dragStart(e){
        console.log("Dragging!");
        e.dataTransfer.setData("id", e.target.getAttribute("data-film"));
        setTimeout(() => {
            this.classList.add("invisible");
        }, 0);
    }

    dragEnd(){
        console.log("Drag End!");
        console.log(this);
        this.classList.remove("invisible");
    }

    /* dragOver(e){
        console.log("Drag Over!");
        e.preventDefault();
        this.classList.add("over");
    }

    dragLeave(e){
        console.log("Drag Leave!");
        e.preventDefault();
        this.classList.remove("over");
    } */

    async renderGame(){
        console.log("chegou aqu! - Render");
        const game = new Game("Zé");
        await game.initGame();

        this.renderCard(game.listOfCards);
        this.renderSlot(game.timeline);

        const dragItems = document.querySelectorAll(".card");
        const dropSlots = document.querySelectorAll(".slot");

        dragItems.forEach(item => {
            item.addEventListener("dragstart", this.dragStart);
            item.addEventListener("dragend", this.dragEnd);
        })

        dropSlots.forEach(function(slot, index){
            slot.addEventListener("dragstart", (e) =>{
                e.dataTransfer.setData("id", e.target.getAttribute("data-film"));
                /* slot.querySelector(".card").remove(); */
                game.timeline.removeOfTimelineCardsAt(index);
        
                setTimeout(() => {
                    slot.querySelector(".card").classList.add("invisible");
                }, 0);
        
                console.log(game.timeline.getTimelineCards());
            });
            slot.addEventListener("dragover", (e)=>{
                console.log("Drag Over!");
                e.preventDefault();
                slot.classList.add("over");
            });
            slot.addEventListener("drop", (e)=>{
                e.preventDefault();
        
                const id = e.dataTransfer.getData("id");
                let card = game.listOfCards.getCardById(id);
                game.timeline.addOfTimelineCardsAt(card, index);
        
                const template_card = document.getElementById("template_card");
                const template = template_card.content.cloneNode(true);
                
                template.querySelector(".card").querySelector("img").src = "https://image.tmdb.org/t/p/w300"+card.poster_path;
                template.querySelector(".card").querySelector("img").alt = card.title;
                template.querySelector(".card").querySelector("img").setAttribute("data-film", card.id);
                
                console.log(template.querySelector(".card"));
        
                slot.appendChild(template);
        
                console.log(game.timeline.getTimelineCards());
            });
            slot.addEventListener("dragleave", (e) => {
                console.log("Drag Leave!");
                e.preventDefault();
                slot.classList.remove("over");
            });
        })
    }
}