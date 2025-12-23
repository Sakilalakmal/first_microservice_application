const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
const PORT = 4005;

const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://localhost:3005/events", event).catch((err) => {
    console.log("Error forwarding event to posts service:", err.message);
  });
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log("Error forwarding event to comments service:", err.message);
  });
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log("Error forwarding event to query service:", err.message);
  });

  axios.post("http://localhost:7005/events", event).catch((err) => {
    console.log("Error forwarding event to moderation service:", err.message);
  });

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(PORT, () => {
  console.log(`Event Bus listening on port ${PORT}`);
});
