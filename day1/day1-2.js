const { open } = require('node:fs/promises');

let sum = 0;

function stringToNumber(str){
  switch(str){
    case "on":
        return 1;
    case "tw":
        return 2;
    case "thre":
        return 3;
    case "four":
        return 4;
    case "fiv":
        return 5;
    case "six":
        return 6;
    case "seven":
        return 7;
    case "eigh":
        return 8;
    case "nin":
        return 9;
    default:
        return str;
  }
}

(async () => {
  const file = await open('./day1.txt');

  for await (const line of file.readLines()) {
    
    let matches = line.match(/\d|on(?=e)|tw(?=o)|thre(?=e)|four|fiv(?=e)|six|seven|eigh(?=t)|nin(?=e)/g);
    let value = stringToNumber(matches[0])+""+stringToNumber(matches[matches.length-1]);

    sum += Number(value);
  }
  console.log("Result is: "+ sum);
})();