class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.coordinates = [x, y];
    this.edges = this.findEdges(x, y);
    this.predecessor = null;
    this.distance = 0;
  }

  findEdges(x, y) {
    const allPossibleEdges = [
      [x + 1, y + 2],
      [x + 1, y - 2],
      [x - 1, y + 2],
      [x - 1, y - 2],
      [x + 2, y + 1],
      [x + 2, y - 1],
      [x - 2, y + 1],
      [x - 2, y - 1],
    ];
    const finalEdges = [];

    for (let i = 0; i < allPossibleEdges.length; i++) {
      if (
        allPossibleEdges[i][0] >= 0 &&
        allPossibleEdges[i][0] <= 7 &&
        allPossibleEdges[i][1] >= 0 &&
        allPossibleEdges[i][1] <= 7
      ) {
        finalEdges.push(allPossibleEdges[i]);
      }
    }

    return finalEdges;
  }
}

export default class Board {
  constructor() {
    this.squares = this.buildBoard();
  }

  buildBoard() {
    const allSquares = [];

    for (let i = 0; i < 8; i++) {
      const row = [];

      for (let j = 0; j < 8; j++) {
        const newSquare = new Square(i, j);
        row.push(newSquare);
      }

      allSquares.push(row);
    }

    return allSquares;
  }

  knightMoves(a, b) {
    const squareA = this.squares[a[0]][a[1]];
    const squareB = this.squares[b[0]][b[1]];
    const queue = [squareB];
    const result = {
      distance: null,
      squares: [],
    };
    let squareInSequence = squareA;

    /* Find path by setting predecessors & distance on squares */
    while (queue.length !== 0) {
      let currentSquare = queue.shift();

      if (currentSquare === squareA) {
        break;
      }

      for (let i = 0; i < currentSquare.edges.length; i++) {
        let nextSquare =
          this.squares[currentSquare.edges[i][0]][currentSquare.edges[i][1]];

        if (nextSquare.predecessor !== null) {
          continue;
        } else {
          nextSquare.predecessor = currentSquare.coordinates;
          nextSquare.distance = currentSquare.distance + 1;
          queue.push(nextSquare);
        }
      }
    }

    /* Get the results */
    result.distance = squareA.distance;
    result.squares.push(squareInSequence.coordinates);

    while (squareInSequence !== squareB) {
      let newX = squareInSequence.predecessor[0];
      let newY = squareInSequence.predecessor[1];
      squareInSequence = this.squares[newX][newY];
      result.squares.push(squareInSequence.coordinates);
    }

    /* Clear distance & predecessor values on all squares */
    for (let i = 0; i < this.squares.length; i++) {
      for (let j = 0; j < this.squares[i].length; j++) {
        let squareToClear = this.squares[i][j];
        squareToClear.distance = 0;
        squareToClear.predecessor = null;
      }
    }

    return result;
  }
}
