const { open } = require('node:fs/promises');


let sum = 0;


(async () => {
  const file = await open('./day4.txt');
  let index = 1;
  for await (const line of file.readLines()) {
    newLine = line.replace(/Card\s{1,3}\d{1,3}:/, '')

    let rounds = newLine.split('|');
    let winningNumbers = rounds[0].match(/\d{1,2}/g);
    let actualNumber = rounds[1].match(/\d{1,2}/g);

    let winningTotal = 0;

    for(let i=0; i < actualNumber.length; i++ ){
      for(let j=0; j < winningNumbers.length; j++ ){
        if (actualNumber[i] === winningNumbers[j]){
          if (winningTotal !== 0) winningTotal = winningTotal * 2;
          else winningTotal = 1;
        }
      }
    }
    sum += winningTotal

    index++;
  }
  console.log("Result is: "+ sum);
})();