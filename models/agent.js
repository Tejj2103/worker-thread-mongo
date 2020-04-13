const { Worker, parentPort, workerData } = require("worker_threads");
const { AgentName } = require("../controller/AgentDetails");
const dataList = workerData;

const saveAgentData = (dataList) => {
  dataList.forEach((data) => {
    var insertUser = new AgentName({
      agentName: data,
    });
    insertUser.save().then((agent) => {});
  });
};

const result = saveAgentData(dataList);
parentPort.postMessage(result);
