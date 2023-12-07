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
   
    //make a function to find a name in the ranking and add the score in the previous score
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

    //make a function to inject the name and score in the csv (../../ranking/ranking.csv)
    

    async injectRanking() {
      /* // Load the data
      //const response = await fetch('https://retoolapi.dev/2TxEXE/ranking');
      const json = await response.json();
    
      // Show the data
      console.log(json); */

      const response = await fetch('../../ranking/ranking.csv');
      const data = await response.text();
      const lines = data.split('\n');
      const json = lines.map(line => {
        const [name, score] = line.split(',');
        return { name, score };
      });

      // Show the data
      console.log(json);
    
      // Modify the data
     /*  if (json[0]) {
        json[0].name = 'luis';
        json[0].score = '1000';
      }
    
      // Convert the data back to CSV
      const csv = json.map(obj => `${obj.name},${obj.score}`).join('\n');
      localStorage.setItem('ranking', csv); */
    }


    //make a function to clear the ranking
    clearRanking(){
      localStorage.setItem('ranking', '');
    }


    //make a function to 'sort' the ranking
    sortRank(){
      let data = localStorage.getItem('ranking');
      let csvLines = data ? data.split('\n') : [];
      csvLines.sort(function(a, b) {
        return a[1] - b[1];
      });
      const newData = csvLines.join('\n');
      localStorage.setItem('ranking', newData);
    }




  }
  