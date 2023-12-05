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
    let minGreen = 0;
    let minBlue = 0;
    let minRed = 0;


    for (let i=0; i< rounds.length; i++ ){
        let green = rounds[i].match(/(\d{1,2}) green/);
        if (green && green[1] > minGreen) minGreen = Number(green[1]);

        let blue = rounds[i].match(/(\d{1,2}) blue/);
        if (blue && blue[1] > minBlue) minBlue = Number(blue[1]);

        let red = rounds[i].match(/(\d{1,2}) red/);
        if (red && red[1] > minRed) minRed = Number(red[1]);

    }

    if (addToSum) {
        sum += minGreen * minBlue * minRed;
    }
    index++;
  }
  console.log("Result is: "+ sum);
})();