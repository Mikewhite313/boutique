const mongoose = require("mongoose");

const uri = process.env.MONGO_URL;
// const uri = "mongodb://localhost:27017/boutiqe";

module.exports = mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected");
  })
  .catch((error) => console.log(error));
