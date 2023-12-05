const { open } = require('node:fs/promises');


let sum = 0;
let numberOfPart = 0;
let tmpResult = 0;

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

function afterCheckingLine(val){
    numberOfPart++;
    if (numberOfPart === 1 ){
        tmpResult= val;
    } else if(numberOfPart === 2 ){
        tmpResult= tmpResult * val
    }
}

function checkingOldLine(oldLine, i) {
    let val;
    if (oldLine[i-1] && isNumber(oldLine[i-1]) && isNumber(oldLine[i]) && oldLine[i+1] && isNumber(oldLine[i+1])) {
        val = Number(findNumberOfTouchingString(oldLine, i-1));
        afterCheckingLine(val);
    } else if (isNumber(oldLine[i])) {
        val = Number(findNumberOfTouchingString(oldLine, i));
        afterCheckingLine(val)
    } else if ( (oldLine[i-1] && isNumber(oldLine[i-1])) || (oldLine[i+1] && isNumber(oldLine[i+1]) )) {
        if (oldLine[i-1] && isNumber(oldLine[i-1])) {
            val = Number(findNumberOfTouchingString(oldLine, i-1));
            afterCheckingLine(val)
        }
        if (oldLine[i+1] && isNumber(oldLine[i+1])) {
            val = Number(findNumberOfTouchingString(oldLine, i+1));
            afterCheckingLine(val)
        }
    }
}

function checkingCurrentLine(currentLine, i) {
    let val;
    if ( (currentLine[i-1] && isNumber(currentLine[i-1])) || (currentLine[i+1] && isNumber(currentLine[i+1]) )) {
        if (currentLine[i-1] && isNumber(currentLine[i-1])) {
            val = Number(findNumberOfTouchingString(currentLine, i-1));
            afterCheckingLine(val)
        }
        if (currentLine[i+1] && isNumber(currentLine[i+1])) {
            val = Number(findNumberOfTouchingString(currentLine, i+1));
            afterCheckingLine(val);
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
            numberOfPart = 0;
            tmpResult = 0;
            if(currentLine[i] !== '.' && currentLine[i] === '*' ){
                await checkingOldLine(oldLine,i);
                await checkingCurrentLine(currentLine,i);
                await checkingOldLine(line,i);
            }
            if (numberOfPart === 2 ){
                sum += tmpResult;
            } 
        }
        oldLine = currentLine;
        currentLine = line;
    }
  }
  console.log("Result: ", sum);
})();