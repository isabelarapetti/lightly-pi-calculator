const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.get("/random-points", (req, res) => {
  const { n } = req.query;
  const numPoints = parseInt(n, 10);

  if (isNaN(numPoints) || numPoints <= 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const points = [];
  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: Math.random(),
      y: Math.random(),
    });
  }

  res.json(points);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port} :)`);
});
