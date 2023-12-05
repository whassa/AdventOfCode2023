const { open } = require("node:fs/promises");

let options = "seeds";
let seeds = [];
let otherStuff = [];
let permutation = [];



function changeOption(line) {
  if (line.includes(":") && !line.includes("seeds:")) {
    // DO permutation
    if (!options !== "seeds") {
        for (let y = 0; y < seeds.length; y++) {
            for (let i = 0; i < otherStuff.length; i++) {
                if (!seeds[y].permuted) {
                    // IF min is minus and max is higher == full rotatation
                    if ( (seeds[y].min >= otherStuff[i][1] && seeds[y].min < otherStuff[i][1] + otherStuff[i][2])
                        &&  (seeds[y].max >= otherStuff[i][1] && seeds[y].max < otherStuff[i][1] + otherStuff[i][2])
                        ) {
                        // do permutation
                        seeds[y].min = otherStuff[i][0] + seeds[y].min - otherStuff[i][1]
                        seeds[y].max =  otherStuff[i][0] + seeds[y].max - otherStuff[i][1]
                        seeds[y].permuted = true;
                        // If min is lower we need to split the seed in other
                    } else  if ( (seeds[y].min < otherStuff[i][1])
                        &&  (seeds[y].max >= otherStuff[i][1] && seeds[y].max < otherStuff[i][1] + otherStuff[i][2])
                        ) {
                        let newSeeds = {
                            min: seeds[y].min,
                            max: otherStuff[i][1]-1,
                            permuted: false,
                        }
                        // do permutation
                        seeds[y].min = otherStuff[i][0];
                        seeds[y].max =  otherStuff[i][0] + seeds[y].max - otherStuff[i][1]
                        seeds[y].permuted = true;
                        seeds.push(newSeeds);
                        // if max is higher we need to split the seed in other
                    } else if ( (seeds[y].min >= otherStuff[i][1] && seeds[y].min < otherStuff[i][1] + otherStuff[i][2])
                        &&  (seeds[y].max > otherStuff[i][1] + otherStuff[i][2])
                    ) {
                        let newSeeds = {
                            min: otherStuff[i][1] + otherStuff[i][2]+1,
                            max: seeds[y].max,
                            permuted: false,
                        }
                        // do permutation
                        seeds[y].min = otherStuff[i][0] + seeds[y].min - otherStuff[i][1]
                        seeds[y].max = otherStuff[i][0] + otherStuff[i][2]
                        seeds[y].permuted = true;
                        seeds.push(newSeeds);
                    } else if ( (seeds[y].min < otherStuff[i][1]) &&  (seeds[y].max > otherStuff[i][1] + otherStuff[i][2]) ) {
                        let minSeeds = {
                            min: seeds[y].min,
                            max: otherStuff[i][1]-1,
                            permuted: false,
                        }
                        let maxSeeds = {
                            min: otherStuff[i][1] + otherStuff[i][2]+1,
                            max: seeds[y].max,
                            permuted: false,
                        }

                        seeds[y].min = otherStuff[i][0]
                        seeds[y].max = otherStuff[i][0] + otherStuff[i][2]
                        seeds[y].permuted = true;
                        seeds.push(minSeeds);
                        seeds.push(maxSeeds);

                    }
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
      seeds = line.match(/\d{1,20} \d{1,20}/g);

      seeds = seeds.map((val)=> { return { 
        min: Number(val.split(" ")[0]),
        max: Number(val.split(" ")[0]) + Number(val.split(" ")[1]) -1,
        permuted: false 
      } })
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
    parseStuff(line);
  }
  changeOption(':');
  let lowest;
  for (let y = 0; y < seeds.length; y++) {
    if (!lowest || seeds[y].min <= lowest ) {
        lowest = seeds[y].min;
    }
  }
  console.log("location: ", lowest);
})();
