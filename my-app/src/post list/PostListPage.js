import React from 'react';
import { Link } from 'react-router-dom';
import './postListStyles.css'; 

const initialPosts = [
  {
    id: "1",
    title: "Title111",
    text: "bla bla bla",
    comments: [
      {
        commentId: "111",
        commentText: "bla bla bla"
      }
    ]
  },
  {
    id: "2",
    title: "Title111",
    text: "bla bla bla",
    comments: [
      {
        commentId: "11111",
        commentText: "bla bla bla22"
      },
      {
        commentId: "12211",
        commentText: "bla bla bla333"
      },
    ]
  },
  {
    id: "3",
    title: "Title111",
    text: "bla bla blahdfgh",
    comments: []
  }
];

const generatePosts = (count) => {
    const posts = [];
    for (let i = 0; i < count; i++) {
        const post = {
            id: Math.random().toString(36).substr(2, 9),
            title: "Generated Title",
            text: "Generated Text",
            comments: []
        };
        posts.push(post);
    }
    return posts;
};

const posts = initialPosts.concat(generatePosts(7)); 

const PostListPage = () => {
  return (
      <div>
          <header className="header">
            <h1>Пости</h1>
            <Link to="/registration">
              <button className="registration-button">Реєстрація/Вхід</button>
            </Link>
          </header>
          <div className="post-list-container">
              <div className="post-list">
                  {posts.map(post => (
                      <div key={post.id} id={post.id} className="post-item"> {}
                          <h3 className="post-title">{post.title}</h3>
                          {post.text && <p className="post-text">{post.text}</p>}
                          {post.comments.length > 0 && (
                              <ul className="comment-list">
                                  {post.comments.map(comment => (
                                      <li key={comment.commentId} className="comment-item">{comment.commentText}</li>
                                  ))}
                              </ul>
                          )}
                          <div className="detail-button-box">
                              <Link to={`/posts/${post.id}`}>
                                  <button className="detail-button">
                                      Детальніше
                                  </button>
                              </Link>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
  );
};

export default PostListPage;