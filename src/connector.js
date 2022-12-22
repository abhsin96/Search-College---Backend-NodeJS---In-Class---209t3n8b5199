// const mongodb = require('mongodb');
const dotenv = require("dotenv");
// const mongoURI = "mongodb://localhost:27017" + "/collegeDetails";
dotenv.config();
const mongoURI = process.env.DATABASE_URL;

let mongoose = require("mongoose");
const { collegeSchema } = require("./schema");

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connection established with mongodb server online");
  })
  .catch((err) => {
    console.log("error while connection", err);
  });
let collegeModel = mongoose.model("collegerecords", collegeSchema);

exports.connection = collegeModel;
