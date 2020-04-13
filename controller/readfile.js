const saveData = require("../models/saveData");

const getData = (data) => {
  console.log("inside get data");
  saveData.showData();
  // saveData.saveAgent(data);
  // saveData.saveUserPolicyInfo(data);
  // saveData.saveUserAccount(data);
  // saveData.savePolicyLob(data);
};

module.exports = { getData };
