const express = require("express");
const helmet = require("helmet");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
// I start of by importing express,helmet,fs and bodyParser
// I then set my port to 5000

// I use the .use method and .json() method for express,bodyParser and helmet
app.use(express.json());

app.use(bodyParser.json());

app.use(helmet());

// I create a variable called apiObj and use JSON.parse and fs to get the info my my json file data.json
const apiObj = JSON.parse(fs.readFileSync("./data.json"));

// then I use app.get to assign the api path and res.json to retrieve the data from my apiObj
app.get("/api", function (req, res) {
  res.json(apiObj);
});

// I then use app.post
app.post("/api/search", function (req, res) {
  // I create the variable search and use Object.assign
  const search = Object.assign(req.body);
  // I then set the length of the object to zero
  apiObj.length = 0;
  // I then push the info in the apiObj
  apiObj.push(search);
  // I then use json to stringify to process the data
  fs.writeFileSync("./data.json", JSON.stringify(apiObj));
  // and return the obj with res.json
  res.json(apiObj);
});

// I then use app.listen to start the server
app.listen(port, () => {
  console.log("Server has started");
});
