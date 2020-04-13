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
const {
  AgentName,
  UserDetails,
  PolicyCarrier,
  PolicyInfo,
} = require("./controller/AgentDetails");
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

app.get("/user/:username", (req, res) => {
  console.log(req.params);
  var username = req.params;
  if (username != "") {
    console.log("Get api");
    UserDetails.find({ firstname: "Julia Brown" })
      .then((user) => {
        var userId = user[0]._id;
        PolicyInfo.find({ user_id: userId })
          .then((policy) => {
            res.send(policy);
          })
          .catch((e) => {
            res.send("Did not found");
          });
      })
      .catch((e) => {
        res.status(500).send("Sorry, cant find that");
      });
  } else {
    res.send("Please provide a valid username!");
  }
});

app.listen(port, () => {
  console.log("Server is runnig on port " + port);
});
