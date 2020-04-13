const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const readFile = require("./controller/readfile");
const os = require("os");
const oS = require("os-utils");
const dbconnect = require("./src/dbconnect");
const csv = require("csv-parser");
const fs = require("fs");
var results = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

oS.cpuUsage(function (v) {
  console.log("CPU Usage (%): " + v);
});
const userCPU = os.cpus();
const userCPUSCount = os.cpus().length;
console.log(userCPU);
console.log(userCPUSCount);

dbconnect.connectToServer(function (err, client) {
  if (err) {
    console.log(err);
  }
  console.log("connetion made");
  fs.createReadStream("./files/data.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      console.log("results");
      readFile.getData(results);
    });
});

app.listen(port, () => {
  console.log("Server is runnig on port " + port);
});
