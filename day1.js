const extractPath = () => {
  return Deno.readTextFileSync("input.txt").split(",");
};

const shortestPath = () => {
  const path = extractPath();
  return path;
};
