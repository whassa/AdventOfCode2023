const { open } = require("node:fs/promises");

let options = "seeds";
let seeds = [];
let startingSeeds = [];
let otherStuff = [];
let permutation = [];

function changeOption(line) {
  if (line.includes(":") && !line.includes("seeds:")) {
    // DO permutation
    if (!options !== "seeds") {
        for (let i = 0; i < otherStuff.length; i++) {
            for (let y = 0; y < seeds.length; y++) {
                if (seeds[y].number >= otherStuff[i][1] && seeds[y].number < otherStuff[i][1] + otherStuff[i][2] && !seeds[y].permuted) {
                    // do permutation
                    seeds[y].number = otherStuff[i][0] + seeds[y].number - otherStuff[i][1]
                    seeds[y].permuted = true;
                }
            }
        }
        for (let y = 0; y < seeds.length; y++) {
            seeds[y].permuted = false;
        }
    }
    options = "soil";
    otherStuff = [];
  }
}

function parseStuff(line) {
  if (line === "") return;
  switch (options) {
    case "seeds":
      seeds = line.match(/\d{1,20}/g);
      startingSeeds = line.match(/\d{1,20}/g);
      seeds = seeds.map((val)=> { return { number: Number(val), permuted: false } })
    default:
      permutation = line.match(/\d{1,20}/g);

      if (permutation && permutation.length === 3) {
        permutation = permutation.map((val)=> Number(val))
        otherStuff.push(permutation);
      }
  }
}

(async () => {
  const file = await open("./day5.txt");
  for await (const line of file.readLines()) {
    changeOption(line);
    await parseStuff(line);
  }
  changeOption(':');

  let lowest;
  let index; 
  for (let y = 0; y < seeds.length; y++) {
    if (!lowest || seeds[y] <= lowest ) {
        lowest = seeds[y].number;
        index = y;
    }
  }
  console.log("location: ", lowest);
})();
