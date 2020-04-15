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
const schedule = require("node-schedule");
const {
  UserDetails,
  PolicyInfo,
  DateTime,
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
      console.log("saving data");
      readFile.getData(results);
    });
});

app.get("/user/:username", (req, res) => {
  var username = req.params.username;
  if (username != "") {
    console.log("Get api", username);
    UserDetails.find({ firstname: username })
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

app.get("/getAggPolicy", async (req, res) => {
  var data = await UserDetails.find();
  var policy = await PolicyInfo.find();

  var obj = {
    data: data,
    policy: policy,
  };
  res.json(obj);
});

app.post("/datetime", (req, res) => {
  var dateinsert = new Date(req.body.date);
  var time = req.body.time;
  dateinsert = dateinsert.toLocaleDateString();
  if (dateinsert != "Invalid Date") {
    var timeArray = [];
    var dateArray = [];
    timeArray = time.split(":");
    dateArray = dateinsert.toString().split("/");
    var d = parseInt(dateArray[1], 10);
    var mon = parseInt(dateArray[0], 10);
    var y = parseInt(dateArray[2], 10);
    var h = parseInt(timeArray[0], 10);
    var m = parseInt(timeArray[1], 10);
    console.log(y, mon, d, h, m, 0);
    var info = new DateTime({
      message: req.body.message,
    });
    var date = new Date(y, mon - 1, d, h, m, 0);
    var job = schedule.scheduleJob(date, function () {
      console.log("saving the message in db");
      info
        .save()
        .then((data) => {
          res.status(200).send("Saved message");
        })
        .catch((e) => {
          res.status(500).send("Sorry, cant find that");
        });
    });
  } else {
    res.status(500).send("Invali date format. Please provide in yyyy-mm-dd");
  }
});

app.listen(port, () => {
  console.log("Server is runnig on port " + port);
});
