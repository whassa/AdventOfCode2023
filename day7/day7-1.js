const { open } = require("node:fs/promises");

let pokerHands = [];

let handRank = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
];

function hisHigherA(a, b) {
  for (let y = 0; y < a.length; y++) {
    if (a[y] !== b[y]) {
      for (let i = 0; i < handRank.length; i++) {
        if (a[y] === handRank[i]) return true;
        if (b[y] === handRank[i]) return false;
      }
    }
  }
}

(async () => {
  const file = await open("./day7.txt");
  for await (const line of file.readLines()) {
    const hand = line.match(/.{5}/g);

    const bid = line.match(/ \d{1,20}/g);

    let consecutive = {};
    let newLine = false;
    for (let i = 0; i < hand[0].length; i++) {
      for (let y = i + 1; y < hand[0].length; y++) {
        if (hand[0][i] === hand[0][y] && !consecutive[hand[0][i]]) {
          consecutive[hand[0][i]] = 1;
          newLine = true;
        } else if (
          hand[0][i] === hand[0][y] &&
          consecutive[hand[0][i]] &&
          newLine
        ) {
          consecutive[hand[0][i]] += 1;
        }
      }
      newLine = false;
    }

    let type = 0;

    if (Object.values(consecutive).length === 2) {
      if (
        Object.values(consecutive)[0] === 2 ||
        Object.values(consecutive)[1] === 2
      )
        type = 4;
      else type = 2;
    } else if (Object.values(consecutive).length === 1) {
      if (Object.values(consecutive)[0] === 1) type = 1;
      else if (Object.values(consecutive)[0] === 2) type = 3;
      else if (Object.values(consecutive)[0] === 3) type = 5;
      else if (Object.values(consecutive)[0] === 4) type = 6;
    }
    pokerHands.push({ hand: hand[0], bid: Number(bid[0]), type });
  }

  // SORTING MECHANISM FOR HANDS
  // SORT HAND RANKS FIRST
  // THEN SORT BY WHO IS HIGHER
  pokerHands.sort((a, b) => {
    if (a.type > b.type) return 1;
    if (a.type < b.type) return -1;
    if (hisHigherA(a.hand, b.hand)) {
      return 1;
    } else {
      return -1;
    }
  });

  let sum = 0;
  for (let i = 0; i < pokerHands.length; i++) {
    sum += pokerHands[i].bid * (i + 1);
  }
  console.log("Sum: ", sum);
})();
