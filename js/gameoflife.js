function seed() {
  return [...arguments]
}

function same([x, y], [j, k]) {
  return ((x === j) && (y === k))
}

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {
  return this.some(c => same(cell, c))
}

const printCell = (cell, state) => {
  return contains.call(state, cell) ? "▣" : "▢";

};

const corners = (state = []) => {

  if (state.length == 0) {
    return { topRight: [0, 0], bottomLeft: [0, 0] }
  }
  let minX = 0;
  let minY = 0;
  let maxX = 0;
  let maxY = 0;
  state.forEach(c => {
    if (c[0] < minX || minX == 0) {
      minX = c[0]
    }
    if (c[0] > maxX || maxX == 0) {
      maxX = c[0]
    }
    if (c[1] < minY || minY == 0) {
      minY = c[1]
    }
    if (c[1] > maxY || maxY == 0) {
      maxY = c[1]
    }
  })
  return { topRight: [maxX, maxY], bottomLeft: [minX, minY] }

};

const printCells = (state) => {

  let out = "";
  //console.log({ state })
  const grid = corners(state);
  //console.log(grid)

  for (row = grid.topRight[1]; row >= grid.bottomLeft[1]; row--) {
    //console.log({ row });
    for (col = grid.bottomLeft[0]; col <= grid.topRight[0]; col++) {
      //console.log(col)
      out += printCell([col, row], state);
      if (col < grid.topRight[0]) {
        out += " ";
      }
    }
    out += "\n"
  }
  //console.log(out)
  return out;


};

const getNeighborsOf = ([x, y]) => {

  const neighbours = [
    [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],
    [x - 1, y], [x + 1, y],
    [x - 1, y - 1], [x, y - 1], [x + 1, y - 1]
  ]
  //console.log({ neighbours })
  return neighbours

};

const getLivingNeighbors = (cell, state) => {
  //console.log({ cell, state })
  const containsBounded = contains.bind(state);
  const livingNeighbours = getNeighborsOf(cell).filter(c => containsBounded(c));
  //console.log({ livingNeighbours })
  return livingNeighbours
};

const willBeAlive = (cell, state) => {

  const livingNeighbours = getLivingNeighbors(cell, state);
  console.log({ state, cell, livingNeighbours })
  if (livingNeighbours.length >= 3) {
    console.log("3+ living neighbours")
    return true;
  }
  if (livingNeighbours.length == 2) {
    console.log("2 living neighbours")
    if (contains.call(state, cell)) {
      console.log("And is currently alive")
      return true;
    } else {
      console.log("But sadly is dead")
      return false;
    }
  }
  return false;

};

const calculateNext = (state) => { };

const iterate = (state, iterations) => { };

const main = (pattern, iterations) => { };

const startPatterns = {
  rpentomino: [
    [3, 2],
    [2, 3],
    [3, 3],
    [3, 4],
    [4, 4]
  ],
  glider: [
    [-2, -2],
    [-1, -2],
    [-2, -1],
    [-1, -1],
    [1, 1],
    [2, 1],
    [3, 1],
    [3, 2],
    [2, 3]
  ],
  square: [
    [1, 1],
    [2, 1],
    [1, 2],
    [2, 2]
  ]
};

const [pattern, iterations] = process.argv.slice(2);
const runAsScript = require.main === module;

if (runAsScript) {
  if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
    main(pattern, parseInt(iterations));
  } else {
    console.log("Usage: node js/gameoflife.js rpentomino 50");
  }
}

exports.seed = seed;
exports.same = same;
exports.contains = contains;
exports.getNeighborsOf = getNeighborsOf;
exports.getLivingNeighbors = getLivingNeighbors;
exports.willBeAlive = willBeAlive;
exports.corners = corners;
exports.calculateNext = calculateNext;
exports.printCell = printCell;
exports.printCells = printCells;
exports.startPatterns = startPatterns;
exports.iterate = iterate;
exports.main = main;