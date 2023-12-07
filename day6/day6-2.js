const { open } = require("node:fs/promises");

let time = [];
let distance = [];
let race = {};

let speed = 0;
let sum = 0;

(async () => {
  const file = await open("./day6.txt");
  for await (const line of file.readLines()) {
    if (line.includes("Time:")) {
      time = line.match(/\d{1,20}/g)

    } else if (line.includes("Distance:")){
      distance = line.match(/\d{1,20}/g);
    }
  }
  
  let tmpTime = '';
  let tmpDistance = '';

  for (let i=0; i< time.length; i++){
    tmpTime += time[i];
    tmpDistance += distance[i];
  }

  race = {
    time: Number(tmpTime),
    distance: Number(tmpDistance),
    victories: 0,
  };

  for( let y=0; y < race.time/2; y++) {
    if ( (y) * (race.time-y) > race.distance ){
      race.victories +=2 ;
    }
  }
  if (race.time % 2 === 0) race.victories +=1;
  console.log('Sum: ', race.victories);

})();
