import Player from "./Player.js"

export default class Ranking {

    constructor(player){
      this.initRanking(player);
    }

    //mak a function to add a player to the ranking if he doesn't exist
    initRanking(player){
      let data = localStorage.getItem('ranking');
      let csvLines = data ? data.split('\n') : [];
      let playerData = [
        player.getName(),
        player.getScore()
      ].join(',');
      let playerExist = false;
      for(let i = 0; i < csvLines.length; i++){
        if(csvLines[i].includes(player.getName())){
          playerExist = true;
        }
      }
      if(!playerExist){
        csvLines.push(playerData);
        const newData = csvLines.join('\n');
        localStorage.setItem('ranking', newData);
      }
    }
   
    refreshRanking(player){
      let data = localStorage.getItem('ranking');
      let csvLines = data ? data.split('\n') : [];
      let playerData = [
        player.getName(),
        player.getScore()
      ].join(',');
      let playerExist = false;
      for(let i = 0; i < csvLines.length; i++){
        if(csvLines[i].includes(player.getName())){
          playerExist = true;
          let score = parseInt(csvLines[i].split(',')[1]);
          score += player.getScore();
          csvLines[i] = [player.getName(), score].join(',');
        }
      }
      if(!playerExist){
        csvLines.push(playerData);
      }
      const newData = csvLines.join('\n');
      localStorage.setItem('ranking', newData);

      this.injectRanking()
    }

    async injectRanking() {

      const response = await fetch('../../ranking/ranking.csv');
      const data = await response.text();
      const lines = data.split('\n');
      const json = lines.map(line => {
        const [name, score] = line.split(',');
        return { name, score };
      });

      console.log(json);
    }

    clearRanking(){
      localStorage.setItem('ranking', '');
    }


    //make a function to sort the local storage data
    sortRank(){
      let data = localStorage.getItem('ranking');
      let csvLines = data ? data.split('\n') : [];
      let csvLinesSorted = csvLines.sort(function(a, b){
        return b.split(',')[1] - a.split(',')[1];
      });
      const newData = csvLinesSorted.join('\n');
      localStorage.setItem('ranking', newData);
    }




  }
  