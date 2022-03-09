const express = require("express");
const app = express();
const mongoose = require("mongoose");
const WilderModel = require("./models/Wilders");
const WilderController = require("./controllers/wilders");

mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb", {
    autoIndex: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function runAsyncWrapper(callback) {
  return function (req, res, next) {
    callback(req, res, next).catch(next);
  };
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/wilder/create", runAsyncWrapper(WilderController.create));
app.get("/api/wilder/read", runAsyncWrapper(WilderController.read));
app.patch("/api/wilder/update/:id", WilderController.update);
app.get("/api/wilder/read/:id", WilderController.readOne);
app.delete("/api/wilder/delete/:id", WilderController.delete);

// start server
app.listen(3000, () => console.log("Server started on 3000"));
