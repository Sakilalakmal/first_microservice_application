const express = require("express");
const app = express();

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  res.send("Create a new post");
});

// start server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
