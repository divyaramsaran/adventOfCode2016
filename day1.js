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

const calcXSteps = (steps, x, y, stepsVisited) => {
  if (x < 0) {
    for (let range = 0; range <= steps; range++) {
      stepsVisited.push([x + range, y]);
    }
    return stepsVisited;
  }

  for (let range = 0; range <= steps; range++) {
    stepsVisited.push([x - range, y]);
  }
  return stepsVisited;
};

const calcYSteps = (steps, x, y, stepsVisited) => {
  if (y < 0) {
    for (let range = 0; range <= steps; range++) {
      stepsVisited.push([x, y + range]);
    }
    return stepsVisited;
  }

  for (let range = 0; range <= steps; range++) {
    stepsVisited.push([x, y - range]);
  }
  return stepsVisited;
};

const ordinatesModifier = (
  x,
  y,
  steps,
  stepsVisited,
  firstTwiceVisited,
  xIncrementSteps,
  xDecrementSteps,
  yIncrementSteps,
  yDecrementSteps
) => {
  if (xIncrementSteps) {
    stepsVisited = calcXSteps(steps, x, y, stepsVisited);
    return [x + steps, y, 0, stepsVisited, firstTwiceVisited];
  }

  if (xDecrementSteps) {
    return [x - steps, y, 2, stepsVisited, firstTwiceVisited];
  }

  if (yIncrementSteps) {
    return [x, y + steps, 1, stepsVisited, firstTwiceVisited];
  }

  if (yDecrementSteps) {
    return [x, y - steps, 3, stepsVisited, firstTwiceVisited];
  }
};

const calcShortestPath = (
  [x, y, axis, stepsVisited, firstTwiceVisited],
  route
) => {
  const steps = Number(route.split(/R|L/)[1]);

  if (firstTwiceVisited.length === 0 && areStepsVisited(stepsVisited, [x, y])) {
    firstTwiceVisited.push(x, y);
  }

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
    stepsVisited,
    firstTwiceVisited,
    xIncrementSteps,
    xDecrementSteps,
    yIncrementSteps,
    yDecrementSteps
  );
};

const shortestPath = () => {
  const path = extractPath();
  const initialAxis = path[0].startsWith("R") ? 0 : 3;
  const [xAxis, yAxis, _, __, firstTwiceVisited] = path.reduce(
    calcShortestPath,
    [0, 0, initialAxis, [], []]
  );
  console.log(firstTwiceVisited);

  return Math.abs(xAxis) + Math.abs(yAxis);
};

console.log(shortestPath());
