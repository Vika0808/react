// PostListPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './postListStyles.css'; // Імпортуємо стилі

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

const posts = initialPosts.concat(generatePosts(7)); // Замість 7 можна вказати бажану кількість додаткових постів

const PostListPage = () => {
    return (
        <div className="post-list-container">
            <div className="post-list">
                {posts.map(post => (
                    <div key={post.id} className="post-item">
                        <h3>{post.title}</h3>
                        {post.text && <p>{post.text}</p>}
                        {post.comments.length > 0 && (
                            <ul className="comment-list">
                                {post.comments.map(comment => (
                                    <li key={comment.commentId} className="comment-item">{comment.commentText}</li>
                                ))}
                            </ul>
                        )}
                        <Link to={`/posts/${post.id}`} className="detail-link">
                            Детальніше
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostListPage;
