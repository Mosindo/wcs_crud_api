const express = require("express");
const app = express();

​app.get("/", (req, res) => {
  res.send("Hello World");
});
​//Start Server
app.listen(3000, () => console.log("Server started on 3000"));