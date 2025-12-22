import React, { useState, useEffect } from "react";
import axios from "axios";

function CommentList({ postId }) {
  const [comments, setComments] = useState({});

  const commentList = async () => {
    const response = await axios.get(
      `http://localhost:4000/posts/${postId}/comments`
    );
    const data = await response.data;
    setComments(data);
  };

  useEffect(() => {
    commentList();
  }, []);

  const renderedComments = Object.values(comments).map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
}

export default CommentList;
