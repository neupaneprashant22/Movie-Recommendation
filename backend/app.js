const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoute");
const app = express();
const router = express.Router();
var cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//DB config
const db = require("./config/keys").MongoURI;

//connect to MongoCompass
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// app.post("/register", (req, res) => {
//   // const
//   const data = req.body;
//   console.log(data);
//   results = data;
//   res.send(JSON.stringify({ status: 200, error: null, response: results }));
// });

//bodyparser

app.use("/users", userRoutes);
app.listen(4000, () => {
  console.log("Connected");
});
