const { Worker, parentPort, workerData } = require("worker_threads");
const { PolicyCategoryLOB } = require("../controller/AgentDetails");
const dataList = workerData;

const savePolicyLob = (dataList) => {
  dataList.forEach((data) => {
    var insertInfo = new PolicyCategoryLOB({
      categoryName: data.category_name,
    });
    insertInfo.save().then((row) => {});
  });
};

const result = savePolicyLob(dataList);
parentPort.postMessage(result);
