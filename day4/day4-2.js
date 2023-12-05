const { open } = require('node:fs/promises');


let sum = 0;

let objScratchCards = {

};

(async () => {
  const file = await open('./day4.txt');
  let index = 1;
  for await (const line of file.readLines()) {
    newLine = line.replace(/Card\s{1,3}\d{1,3}:/, '')

    let rounds = newLine.split('|');
    let winningNumbers = rounds[0].match(/\d{1,2}/g);
    let actualNumber = rounds[1].match(/\d{1,2}/g);

    if (objScratchCards[index] === undefined) {
      objScratchCards[index] = 1;
    } else {
      objScratchCards[index] += 1;
    }


    let numberOfFutureCard = 0;

    for(let i=0; i < actualNumber.length; i++ ){
      for(let j=0; j < winningNumbers.length; j++ ){
        if (actualNumber[i] === winningNumbers[j]){
          numberOfFutureCard += 1;
        }
      }
    }

    for(let i=1; i<=numberOfFutureCard; i++ ){
      if (objScratchCards[index+i] === undefined) {
        objScratchCards[index+i] = 1 * objScratchCards[index];
      } else {
        objScratchCards[index+i] += 1 * objScratchCards[index];
      }
    }
    index++;
  }

  for (let [key, value] of Object.entries(objScratchCards)) {
    if (Number(key) < index) sum += value;
  }
  console.log("Result is: "+ sum);
})();