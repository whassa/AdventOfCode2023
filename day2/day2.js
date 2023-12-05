const { open } = require('node:fs/promises');

const RED =12;
const GREEN = 13;
const BLUE = 14;
let sum = 0;
let newLine;


(async () => {
  const file = await open('./day2.txt');
  let index = 1;
  let addToSum = true;
  for await (const line of file.readLines()) {
    newLine = line.replace('Game '+index+':', '')
    addToSum = true;
    let rounds = newLine.split(';');
    for (let i=0; i< rounds.length; i++ ){
        let green = rounds[i].match(/(\d{1,2}) green/);
        if (green && green[1] > GREEN) addToSum = false;
        let blue = rounds[i].match(/(\d{1,2}) blue/);
        if (blue && blue[1] > BLUE) addToSum = false;
        let red = rounds[i].match(/(\d{1,2}) red/);
        if (red && red[1] > RED) addToSum = false;
    }

    if (addToSum) {
        sum += index;
    }
    index++;
  }
  console.log("Result is: "+ sum);
})();