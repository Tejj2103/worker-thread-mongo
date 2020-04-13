const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const MongoClient = require("mongodb").MongoClient;
const connectionURL =
  "mongodb://tejjain:tejJain2103@cluster1-shard-00-00-ayi5x.mongodb.net:27017,cluster1-shard-00-01-ayi5x.mongodb.net:27017,cluster1-shard-00-02-ayi5x.mongodb.net:27017/test?ssl=true&replicaSet=Cluster1-shard-0&authSource=admin&retryWrites=true&w=majority";

var _db;
module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(
      connectionURL,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, client) {
        _db = client.db("test");
        return callback(err);
      }
    );
  },

  getDb: function () {
    return _db;
  },
};
