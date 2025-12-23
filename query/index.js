const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    if (post) {
      post.comments.push({ id, content, status }); //*added status here *//
    }
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    if (comment) {
      comment.status = status;
      comment.content = content;
    }
  }
  console.log(posts);
  res.send({ status: "OK" });
});

app.listen(4002, () => {
  console.log("Query service running on http://localhost:4002");
});
1;
