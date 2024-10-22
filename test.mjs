import Board from "./knights-travails.mjs";

const test = new Board();

function printResults(move) {
  console.log("It took " + move.distance + " moves to get there.");
  console.log("Here are the steps:");

  for (let i = 0; i < move.squares.length; i++) {
    console.log(move.squares[i]);
  }
}

let move = test.knightMoves([0, 0], [0, 4]);
printResults(move);

move = test.knightMoves([0, 7], [5, 6]);
printResults(move);

move = test.knightMoves([3, 3], [2, 5]);
printResults(move);

move = test.knightMoves([4, 1], [2, 6]);
printResults(move);
