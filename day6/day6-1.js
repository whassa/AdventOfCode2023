const { open } = require("node:fs/promises");

let time = [];
let distance = [];
let race = [];

let speed = 0;
let sum = 0;

(async () => {
  const file = await open("./day6.txt");
  for await (const line of file.readLines()) {
    if (line.includes("Time:")) {
      time = line.match(/\d{1,20}/g).map((val) => Number(val))

    } else if (line.includes("Distance:")){
      distance = line.match(/\d{1,20}/g).map((val) => Number(val));
    }
  }
  for(let i=0; i<time.length; i++){
    race.push({time: time[i], distance: distance[i], victories: 0})
  }
  for(let i=0; i< race.length; i++){
    for( let y=0; y < race[i].time; y++) {
      if ( (y) * (race[i].time-y) > race[i].distance ){
        race[i].victories ++;
      }
    }
  }
  let sum = 1;
  for(let i=0; i< race.length; i++){
    sum *= race[i].victories;
  }
  console.log('Sum: ', sum);

})();
