const extractPath = () => {
  return Deno.readTextFileSync("input.txt")
    .split(",")
    .map((route) => route.trim());
};

const areStepsVisited = (arr1, arr2) => {
  return arr1[0] === arr2[0] && arr1[1] === arr2[1];
};

const calcXSteps = (steps, x, y, stepsVisited) => {
  if (x < 0) {
    for (let range = 0; range < steps; range++) {
      stepsVisited.push([x + range, y]);
    }
    return stepsVisited;
  }

  for (let range = 0; range < steps; range++) {
    stepsVisited.push([x - range, y]);
  }
  return stepsVisited;
};

const calcYSteps = (steps, x, y, stepsVisited) => {
  if (y < 0) {
    for (let range = 0; range < steps; range++) {
      stepsVisited.push([x, y + range]);
    }
    return stepsVisited;
  }

  for (let range = 0; range < steps; range++) {
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
    stepsVisited = calcXSteps(steps, x, y, stepsVisited);
    return [x - steps, y, 2, stepsVisited, firstTwiceVisited];
  }

  if (yIncrementSteps) {
    stepsVisited = calcYSteps(steps, x, y, stepsVisited);
    return [x, y + steps, 1, stepsVisited, firstTwiceVisited];
  }

  if (yDecrementSteps) {
    stepsVisited = calcYSteps(steps, x, y, stepsVisited);
    return [x, y - steps, 3, stepsVisited, firstTwiceVisited];
  }
};

const calcShortestPath = (
  [x, y, axis, stepsVisited, firstTwiceVisited],
  route
) => {
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
    stepsVisited,
    firstTwiceVisited,
    xIncrementSteps,
    xDecrementSteps,
    yIncrementSteps,
    yDecrementSteps
  );
};

const findLastStep = (steps) => {
  const [x, y] = steps.at(-1);
  const [x1, y1] = steps.at(-2);
  const [xDiff, yDiff] = [x - x1, y - y1];
  return [x + xDiff, y + yDiff];
};

const twiceVisitedpCoordinates = (stepsVisited) => {
  const matched = [];
  for (let position = 0; position < stepsVisited.length - 1; position++) {
    for (let target = position + 1; target < stepsVisited.length; target++) {
      if (areStepsVisited(stepsVisited[position], stepsVisited[target])) {
        const match = [...stepsVisited[position]];
        match.push(target);
        matched.push(match);
      }
    }
  }
  return matched;
};

const firstPlace = (twiceVisitedpCoordinates) => {
  return twiceVisitedpCoordinates.reduce((firstTwiceCoordinate, coordinate) => {
    if (firstTwiceCoordinate.at(-1) > coordinate.at(-1)) {
      firstTwiceCoordinate.pop();
      firstTwiceCoordinate.push(coordinate);
    }
    return firstTwiceCoordinate;
  });
};

const absolute = (value) => Math.abs(value);

const shortestPath = () => {
  const path = extractPath();
  const initialAxis = path[0].startsWith("R") ? 0 : 3;
  const [xAxis, yAxis, _, stepsVisited, firstTwiceVisited] = path.reduce(
    calcShortestPath,
    [0, 0, initialAxis, [], []]
  );
  stepsVisited.push(findLastStep(stepsVisited));

  const firstCoordinate = firstPlace(twiceVisitedpCoordinates(stepsVisited));
  const [x, y] = firstCoordinate;
  return [absolute(xAxis) + absolute(yAxis), absolute(x) + absolute(y)];
};

console.log(shortestPath());
