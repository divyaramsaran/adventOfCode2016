const extractPath = () => {
  return Deno.readTextFileSync("input.txt")
    .split(",")
    .map((route) => route.trim());
};

const areStepsVisited = (stepsVisited, currentSteps) => {
  return stepsVisited.some((steps) => {
    return steps[0] === currentSteps[0] && steps[1] === currentSteps[1];
  });
};

const ordinatesModifier = (
  x,
  y,
  steps,
  xIncrementSteps,
  xDecrementSteps,
  yIncrementSteps,
  yDecrementSteps
) => {
  if (xIncrementSteps) {
    return [x + steps, y, 0];
  }

  if (xDecrementSteps) {
    return [x - steps, y, 2];
  }

  if (yIncrementSteps) {
    return [x, y + steps, 1];
  }

  if (yDecrementSteps) {
    return [x, y - steps, 3];
  }
};

const calcShortestPath = ([x, y, axis, stepsVisited], route) => {
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
    steps,
    xIncrementSteps,
    xDecrementSteps,
    yIncrementSteps,
    yDecrementSteps
  );
};

const shortestPath = () => {
  const path = extractPath();
  const initialAxis = path[0].startsWith("R") ? 0 : 3;
  const [xAxis, yAxis] = path.reduce(calcShortestPath, [0, 0, initialAxis, []]);

  return Math.abs(xAxis) + Math.abs(yAxis);
};

console.log(shortestPath());
