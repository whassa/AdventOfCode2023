const { open } = require('node:fs/promises');


let sum = 0;

function isNumber(num){
    return !isNaN(num)
}

function findNumberOfTouchingString(line, str){
    let index = str;

    while(isNumber(line[index]) ){

        index--;
    }
    index++;

    let number= '';
    while(isNumber(line[index])) {
        number += line[index];
        index++;
    }
    return number;
}

function checkingOldLine(oldLine, i) {
    if (oldLine[i-1] && isNumber(oldLine[i-1]) && isNumber(oldLine[i]) && oldLine[i+1] && isNumber(oldLine[i+1])) {
        sum += Number(findNumberOfTouchingString(oldLine, i-1));
    } else if (isNumber(oldLine[i])) {
        sum += Number(findNumberOfTouchingString(oldLine, i));
    } else if ( (oldLine[i-1] && isNumber(oldLine[i-1])) || (oldLine[i+1] && isNumber(oldLine[i+1]) )) {
        if (oldLine[i-1] && isNumber(oldLine[i-1])) {
            sum += Number(findNumberOfTouchingString(oldLine, i-1));
        }
        if (oldLine[i+1] && isNumber(oldLine[i+1])) {
            sum += Number(findNumberOfTouchingString(oldLine, i+1));
        }
    }
}

function checkingCurrentLine(currentLine, i) {
    if ( (currentLine[i-1] && isNumber(currentLine[i-1])) || (currentLine[i+1] && isNumber(currentLine[i+1]) )) {
        if (currentLine[i-1] && isNumber(currentLine[i-1])) {
            sum += Number(findNumberOfTouchingString(currentLine, i-1));
        }
        if (currentLine[i+1] && isNumber(currentLine[i+1])) {
            sum += Number(findNumberOfTouchingString(currentLine, i+1));
        }
    }
}

(async () => {
  const file = await open('./day3.txt');

  let oldLine = undefined;
  let currentLine = undefined;

  for await (const line of file.readLines()) {
    if (oldLine ===  undefined) {
        oldLine = line;
    } else if (currentLine ===  undefined) {
        currentLine = line;
    } else {
        for(let i = 0; i< currentLine.length; i++ ){
            if(currentLine[i] !== '.' && isNaN(currentLine[i])){
                await checkingOldLine(oldLine,i);
                await checkingCurrentLine(currentLine,i);
                await checkingOldLine(line,i);
            }
        }
        oldLine = currentLine;
        currentLine = line;
    }
  }
  console.log(sum);
})();