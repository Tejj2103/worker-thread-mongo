const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const connectionURL =
  "mongodb://tejjain:tejJain2103@cluster1-shard-00-00-ayi5x.mongodb.net:27017,cluster1-shard-00-01-ayi5x.mongodb.net:27017,cluster1-shard-00-02-ayi5x.mongodb.net:27017/test?ssl=true&replicaSet=Cluster1-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const AgentNameSchema = new mongoose.Schema({
  agentName: {
    type: String,
    trim: true,
    lowercase: true,
  },
});

const UserDetailsSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    lowercase: true,
  },
  dob: {
    type: String,
    trim: true,
    lowercase: true,
  },
  address: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
    lowercase: true,
  },
  city: {
    type: String,
    trim: true,
    lowercase: true,
  },
  state: {
    type: String,
    trim: true,
    lowercase: true,
  },
  zipCode: {
    type: String,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  gender: {
    type: String,
    trim: true,
    lowercase: true,
  },
  userType: {
    type: String,
    trim: true,
    lowercase: true,
  },
});

const UserAccountSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  accoutName: {
    type: String,
    trim: true,
    lowercase: true,
  },
});

const PolicyCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    trim: true,
    lowercase: true,
  },
});

const PolicyCarrierSchema = new mongoose.Schema({
  companyName: {
    type: String,
    trim: true,
    lowercase: true,
  },
});

const PolicyInfoSchema = new mongoose.Schema({
  policyNumber: {
    type: String,
    trim: true,
    lowercase: true,
  },
  policy_start_date: {
    type: String,
    trim: true,
    lowercase: true,
  },
  policy_end_date: {
    type: String,
    trim: true,
    lowercase: true,
  },
  policyCategory: {
    type: String,
    trim: true,
    lowercase: true,
  },
  collection_id: {
    type: Number,
    trim: true,
    lowercase: true,
  },
  company_collection_id: {
    type: String,
    trim: true,
    lowercase: true,
  },
  user_id: {
    type: String,
    trim: true,
    lowercase: true,
  },
});

const AgentName = mongoose.model("AgentName", AgentNameSchema);
const UserDetails = mongoose.model("UserDetails", UserDetailsSchema);
const UserAccountInfo = mongoose.model("UserAccountInfo", UserAccountSchema);
const PolicyCategoryLOB = mongoose.model(
  "PolicyCategoryLOB",
  PolicyCategorySchema
);
const PolicyCarrier = mongoose.model("PolicyCarrier", PolicyCarrierSchema);
const PolicyInfo = mongoose.model("PolicyInfo", PolicyInfoSchema);
module.exports = {
  AgentName,
  UserDetails,
  UserAccountInfo,
  PolicyCategoryLOB,
  PolicyCarrier,
  PolicyInfo,
};
