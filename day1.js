const extractPath = () => {
  return Deno.readTextFileSync("input.txt")
    .split(",")
    .map((route) => route.trim());
};

const ordinatesModifier = (
  x,
  y,
  axis,
  steps,
  xIncrementSteps,
  xDecrementSteps,
  yIncrementSteps,
  yDecrementSteps
) => {
  if (xIncrementSteps) {
    x += steps;
    return [x, y, 0];
  }

  if (xDecrementSteps) {
    x -= steps;
    return [x, y, 2];
  }

  if (yIncrementSteps) {
    y += steps;
    return [x, y, 1];
  }

  if (yDecrementSteps) {
    y -= steps;
    return [x, y, 3];
  }
};

const calcShortestPath = ([x, y, axis], route) => {
  const steps = Number(route.split(/R|L/)[1]);

  const xIncrementSteps =
    (route.startsWith("R") && axis === 1) ||
    (route.startsWith("L") && axis === 3);

  const xDecrementSteps =
    (route.startsWith("L") && axis === 1) ||
    (route.startsWith("R") && axis === 3);

  const yIncrementSteps =
    (route.startsWith("L") && axis === 0) ||
    (route.startsWith("R") && axis === 2);

  const yDecrementSteps =
    (route.startsWith("R") && axis === 0) ||
    (route.startsWith("L") && axis === 2);

  return ordinatesModifier(
    x,
    y,
    axis,
    steps,
    xIncrementSteps,
    xDecrementSteps,
    yIncrementSteps,
    yDecrementSteps
  );
};

const shortestPath = () => {
  const path = extractPath();

  if (path[0].startsWith("R")) {
    const [xAxis, yAxis] = path.reduce(calcShortestPath, [0, 0, 0]);
    return Math.abs(xAxis) + Math.abs(yAxis);
  }

  const [xAxis, yAxis] = path.reduce(calcShortestPath, [0, 0, 3]);
  return Math.abs(xAxis) + Math.abs(yAxis);
};

console.log(shortestPath());