import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './postListStyles.css';
import axios from 'axios';
import { baseURL } from '../constants';




const PostListPage = () => {
  const [posts,setPosts] = useState([]);
  const getPosts = async () =>  {
    const res = await axios.get(`${baseURL}/posts`)
    
    setPosts(res.data)
 }

useEffect(
   () =>  {
      getPosts()
    }
    , [])
    console.log(posts)
  return (
    <div className="page-container">
      <header className="header">
        <h1>Щоденник мандрівника</h1>
        <Link to="/registration">
          <button className="registration-button">Реєстрація/Вхід</button>
        </Link>
      </header>
      <div className="post-list-container">
      <Link to={`/posts/new`}>
                  <button className="add-post-button">+</button>
                  
      </Link>
        <div className="post-list">
          {posts && Array.isArray(posts) && posts.map(post => (
            <div key={post.id} id={post.id} className="post-item">
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
                  <button className="add-post-button">+</button>
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
