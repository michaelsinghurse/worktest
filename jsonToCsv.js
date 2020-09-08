// jsonToCsv.js

const fs = require("fs");
const path = require("path");

const JSON_FILE = process.argv[2];
const CSV_FILE = process.argv[3];

if (!JSON_FILE || !CSV_FILE) {
  const msg = "Missing parameters: Must supply json and csv file paths. "
    + "For example: `node jsonToCsv.js <jsonFilePath> <csvFilePath>`";
  throw Error(msg);
}

fs.promises.readFile(JSON_FILE, "utf8")
  .then(data => {
    let csv = "";

    JSON.parse(data)["coordinates"].forEach((pair, index) => {
      csv += `${index + 1},${pair[0]},${pair[1]}\n`;
    });

    return fs.promises.writeFile(CSV_FILE, csv);
  })
  .then(() => {
    console.log("Success: json data written to " + CSV_FILE);
  })
  .catch(err => {
    console.log(err)
  });
