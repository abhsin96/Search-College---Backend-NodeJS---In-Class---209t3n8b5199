const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
// const { connections } = require("mongoose");
const { connection } = require("./connector");

dotenv.config();
// const port = process.env.PORT || 8080;
const port = 8080;

// following parameters: name, state, city, minPackage, maxFees, course and exams

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/findColleges", async (req, res) => {
  const {
    name = "",
    state = "",
    city = "",
    minPackage = 0,
    maxFees = 0,
    course = "",
    exams = [],
  } = req.body;
  //   console.log(name, state, city, minPackage, maxFees, course, exams);
  console.log(req.body);
  try {
    const query = {};

    if (name) {
      query["name"] = { $regex: name };
    }
    if (state) {
      query["state"] = { $regex: state };
    }
    if (city) {
      query["city"] = { $regex: city };
    }
    if (course) {
      query["course"] = { $regex: course };
    }

    if (minPackage) {
      if (+minPackage > 0) {
        query["minPackage"] = { $gte: +minPackage };
      } else {
        res.status(400).json({ error: "Invalid Payload" });
      }
    }
    if (maxFees) {
      if (+maxFees > 0) {
        query["maxFees"] = { $gte: +maxFees };
      } else {
        res.status(400).json({ error: "Invalid Payload" });
      }
    }
    const result = await connection.find(query);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ status: false, error: "internal server error" });
  }
});

app.get("*", async (req, res) => {
  res.status(404).json({ message: "Invalid Route" });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
