// worker to calculate pi using Monte Carlo method
// sources on monte carlo method:
// https://en.wikipedia.org/wiki/Monte_Carlo_method
// https://stackoverflow.com/questions/52295396/calculating-%CF%80-using-a-monte-carlo-simulation-limitations
// https://www.instructables.com/Pi-Approximation-With-Raspberry-Pi-Monte-Carlo-Met/
// examples
// https://github.com/Dan-Q/monte-carlo-pi/blob/master/monte-carlo-pi.html
// https://www.geeksforgeeks.org/estimating-value-pi-using-monte-carlo/

// web workers sources:
// docs https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
// examples
// https://www.codemag.com/Article/2101071/Understanding-and-Using-Web-Workers
// https://blog.sachinchaurasiya.dev/how-web-worker-works-with-a-practical-example

self.onmessage = function (event) {
  const { points, numPoints } = event.data;

  // simple validation
  if (!points || !numPoints || numPoints <= 0) {
    self.postMessage({ error: "Invalid input" });
    return;
  }

  //initial calculation. Needs some revision to check presition or posible errors
  let pointsInsideCircle = 0;
  for (const point of points) {
    if (point.x * point.x + point.y * point.y <= 1) {
      pointsInsideCircle++;
    }
  }

  const pi = 4 * (pointsInsideCircle / numPoints);
  self.postMessage({ pi }); // result
};
