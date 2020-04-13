const { Worker, parentPort, workerData } = require("worker_threads");
const { UserAccountInfo } = require("../controller/AgentDetails");
const dataList = workerData;

const saveUserAccountData = (dataList) => {
  dataList.forEach((data) => {
    var insertInfo = new UserAccountInfo({
      firstname: data.firstname,
      email: data.email,
      accoutName: data.account_name,
    });
    insertInfo.save().then((user) => {});
  });
};

const result = saveUserAccountData(dataList);
parentPort.postMessage(result);
