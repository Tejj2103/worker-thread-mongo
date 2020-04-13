const { Worker, parentPort, workerData } = require("worker_threads");
const {
  UserDetails,
  PolicyCarrier,
  PolicyInfo,
} = require("../controller/AgentDetails");
const { MongoClient, ObjectID } = require("mongodb");

const dataList = workerData;

const saveUserPolicyInfoData = (dataList) => {
  dataList.forEach((data) => {
    original_id = ObjectID();
    original_id1 = ObjectID();
    original_id2 = ObjectID();
    var insertUserInfo = new UserDetails({
      _id: original_id,
      firstname: data.firstname,
      dob: data.dob,
      address: data.address,
      phoneNumber: data.phone,
      city: data.city,
      state: data.state,
      zipCode: data.zip,
      email: data.email,
      gender: data.gender,
      userType: data.userType,
    });
    var insertPolicyInfo = new PolicyInfo({
      _id: original_id2,
      policyNumber: data.policy_number,
      policy_start_date: data.policy_start_date,
      policy_end_date: data.policy_end_date,
      policyCategory: data.category_name,
      company_collection_id: original_id1,
      user_id: original_id,
    });
    var insertCompanyInfo = new PolicyCarrier({
      _id: original_id1,
      companyName: data.company_name,
    });
    insertUserInfo.save().then((row) => {});
    insertPolicyInfo.save().then((row) => {});
    insertCompanyInfo.save().then((row) => {});
  });
};

const result = saveUserPolicyInfoData(dataList);
parentPort.postMessage(result);
