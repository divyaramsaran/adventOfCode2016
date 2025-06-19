const extractPath = () => {
  return Deno.readTextFileSync("input.txt").split(",");
};

const calcShortestPath = (cordinatesWithAxis, route) => {
  return cordinatesWithAxis;
};

const shortestPath = () => {
  const path = extractPath();

  if (path[0].startsWith("R")) {
    return path.reduce(calcShortestPath, [0, 0, 0]);
  }

  return path.reduce(calcShortestPath(), [0, 0, 3]);
};

console.log(shortestPath());

/**
 * x - 0
 * y - 1
 * -x - 2
 * -y - 3
 */
