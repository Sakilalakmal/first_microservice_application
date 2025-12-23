import React, { useEffect, useState } from "react";
import CommentCreat from "./CommentCreat";
import CommentList from "./CommentList";

function PostList() {
  const [posts, setPosts] = useState({});

  const fethcPosts = async () => {
    const response = await fetch("http://localhost:4002/posts");
    console.log(response.data);
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fethcPosts();
  }, []);

  console.log(posts);

  const renderPosts = Object.values(posts).map((post) => {
    return (
      <div key={post.id} className="card">
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
        </div>
        <div className="px-2 py-2">
          <CommentCreat postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderPosts}
    </div>
  );
}

export default PostList;
