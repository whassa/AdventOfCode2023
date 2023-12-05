const { open } = require('node:fs/promises');

let sum = 0;

(async () => {
  const file = await open('./day1.txt');

  for await (const line of file.readLines()) {
    
    let matches = line.match(/\d/g);
    let value = matches[0]+""+matches[matches.length-1];

    sum += Number(value);
  }
  console.log("Result is: "+ sum);
})();