var dbConnect = require("../src/dbconnect");
const os = require("os");
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const path = require("path");
var workerPath;

const userCPUSCount = os.cpus().length;

const showData = () => {
  console.log("inside save data");
};
const saveAgent = (data) => {
  workerPath = path.resolve("./models/agent.js");
  var agentList = [];
  data.forEach((data) => {
    agentList.push(data.agent);
  });
  agentList = Array.from(new Set(agentList));
  return new Promise(async (parentResolve, parentReject) => {
    const listSize = Math.ceil(agentList.length / userCPUSCount);
    console.log("list size", listSize);
    var segments = [];
    for (let i = 0; i < userCPUSCount; i++) {
      const start = i * listSize;
      const end = start + listSize;
      const segment = agentList.slice(start, end);
      segments.push(segment);
    }
    console.log("segments", segments);
    try {
      const result = await Promise.all(
        segments.map(
          (segment) =>
            new Promise((resolve, reject) => {
              const worker = new Worker(workerPath, {
                workerData: segment,
              });
              worker.on("message", resolve);
              worker.on("error", reject);
              worker.on("exit", (code) => {
                if (code !== 0)
                  reject(new Error(`Worker stopped with exit code ${code}`));
              });
            })
        )
      );
      parentResolve(result);
    } catch (e) {
      parentReject(e);
    }
  });
};

const saveUserPolicyInfo = (data) => {
  workerPath = path.resolve("./models/userPolicyInfo.js");
  return new Promise(async (parentResolve, parentReject) => {
    const listSize = Math.ceil(data.length / userCPUSCount);
    console.log("list size", listSize);
    var segments = [];
    for (let i = 0; i < userCPUSCount; i++) {
      const start = i * listSize;
      const end = start + listSize;
      const segment = data.slice(start, end);
      segments.push(segment);
    }
    console.log("segments", segments);
    try {
      const result = await Promise.all(
        segments.map(
          (segment) =>
            new Promise((resolve, reject) => {
              const worker = new Worker(workerPath, {
                workerData: segment,
              });
              worker.on("message", resolve);
              worker.on("error", reject);
              worker.on("exit", (code) => {
                if (code !== 0)
                  reject(new Error(`Worker stopped with exit code ${code}`));
              });
            })
        )
      );
      parentResolve(result);
    } catch (e) {
      parentReject(e);
    }
  });
};

const saveUserAccount = (data) => {
  workerPath = path.resolve("./models/userAccount.js");
  return new Promise(async (parentResolve, parentReject) => {
    const listSize = Math.ceil(data.length / userCPUSCount);
    console.log("list size", listSize);
    var segments = [];
    for (let i = 0; i < userCPUSCount; i++) {
      const start = i * listSize;
      const end = start + listSize;
      const segment = data.slice(start, end);
      segments.push(segment);
    }
    console.log("segments", segments);
    try {
      const result = await Promise.all(
        segments.map(
          (segment) =>
            new Promise((resolve, reject) => {
              const worker = new Worker(workerPath, {
                workerData: segment,
              });
              worker.on("message", resolve);
              worker.on("error", reject);
              worker.on("exit", (code) => {
                if (code !== 0)
                  reject(new Error(`Worker stopped with exit code ${code}`));
              });
            })
        )
      );
      parentResolve(result);
    } catch (e) {
      parentReject(e);
    }
  });
};

const savePolicyLob = (data) => {
  workerPath = path.resolve("./models/policylob.js");
  return new Promise(async (parentResolve, parentReject) => {
    const listSize = Math.ceil(data.length / userCPUSCount);
    console.log("list size", listSize);
    var segments = [];
    for (let i = 0; i < userCPUSCount; i++) {
      const start = i * listSize;
      const end = start + listSize;
      const segment = data.slice(start, end);
      segments.push(segment);
    }
    console.log("segments", segments);
    try {
      const result = await Promise.all(
        segments.map(
          (segment) =>
            new Promise((resolve, reject) => {
              const worker = new Worker(workerPath, {
                workerData: segment,
              });
              worker.on("message", resolve);
              worker.on("error", reject);
              worker.on("exit", (code) => {
                if (code !== 0)
                  reject(new Error(`Worker stopped with exit code ${code}`));
              });
            })
        )
      );
      parentResolve(result);
    } catch (e) {
      parentReject(e);
    }
  });
};

module.exports = {
  showData,
  saveAgent,
  saveUserPolicyInfo,
  saveUserAccount,
  savePolicyLob,
};
