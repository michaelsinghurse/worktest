// challenge2.js

const fs = require("fs");

const JSON_FILE = "region.json";
const JSON_FILE_SMOOTHED = "regionSmoothed.json";
const TOLERANCE = 0.001;

function removeOutliers(points, maxDistance) {
  const output = [ points[0] ];
  
  for (let index = 1; index < points.length; index += 1) {
    const currentPoint = points[index];
    const previousPoint = output[output.length - 1];

    if (
      Math.abs(currentPoint[0] - previousPoint[0]) < maxDistance &&
      Math.abs(currentPoint[1] - previousPoint[1]) < maxDistance
    ) {
      output.push(currentPoint);
    }
  }
  
  return output;
}

// Read in original points, remove outliers, write points to a new file
fs.promises.readFile(JSON_FILE, "utf8")
  .then(data => {
    const jsonObject = JSON.parse(data);
    const points = jsonObject.coordinates;
    const pointsSmoothed = removeOutliers(points, TOLERANCE); 
    console.log(`Removed ${points.length - pointsSmoothed.length} points.`);
    
    jsonObject.coordinates = pointsSmoothed;

    return fs.promises.writeFile(
      JSON_FILE_SMOOTHED, 
      JSON.stringify(jsonObject), 
      "utf8"
    );
  })
  .then(() => console.log(`New points written to file ${JSON_FILE_SMOOTHED}.`))
  .catch(error => console.error(error));


