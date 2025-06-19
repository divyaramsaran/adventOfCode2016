const extractPath = () => {
  return Deno.readTextFileSync("input.txt").split(",");
};

const calcShortestPath = ([x, y, axis], route) => {
  const steps = Number(route.split(/R|L/)[1]);

  const rightAndYaxis = route.startsWith("R") && axis === 1;
  const leftAndNegativeYaxis = route.startsWith("L") && axis === 3;

  const leftAndYaxis = route.startsWith("L") && axis === 1;
  const rightAndNegativeYaxis = route.startsWith("R") && axis === 3;

  const leftAndXaxis = route.startsWith("L") && axis === 0;
  const rightAndNegativeXaxis = route.startsWith("R") && axis === 2;

  const rightAndXaxis = route.startsWith("R") && axis === 0;
  const leftAndNegativeXaxis = route.startsWith("L") && axis === 2;

  if (rightAndYaxis || leftAndNegativeYaxis) {
    console.log("hello");
    x += steps;
    return [x, y, 0];
  }

  if (leftAndYaxis || rightAndNegativeYaxis) {
    x -= steps;
    return [x, y, 2];
  }

  if (leftAndXaxis || rightAndNegativeXaxis) {
    y += steps;
    return [x, y, 1];
  }

  if (rightAndXaxis || leftAndNegativeXaxis) {
    y -= steps;
    return [x, y, 3];
  }

  return [x, y, axis];
};

const shortestPath = () => {
  const path = extractPath();

  if (path[0].startsWith("R")) {
    return path.reduce(calcShortestPath, [0, 0, 0]);
  }

  return path.reduce(calcShortestPath, [0, 0, 3]);
};

console.log(shortestPath());

/**
 * x - 0
 * y - 1
 * -x - 2
 * -y - 3
 */
