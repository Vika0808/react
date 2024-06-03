import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './postListStyles.css';
import axios from 'axios';
import { baseURL } from '../constants';

const PostListPage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${baseURL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getPosts = async () => {
    try {
      const res = await axios.get(`${baseURL}/posts`);
      setPosts(res.data);
      setFilteredPosts(res.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to fetch posts');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleSort = (option) => {
    let sortedPosts = [...filteredPosts];
    if (option === 'alphabetic') {
      sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === 'likes') {
      sortedPosts.sort((a, b) => b.likes - a.likes);
    }
    setFilteredPosts(sortedPosts);
  };

  useEffect(() => {
    getUserData();
    getPosts();
  }, []);

  return (
    <div className="page-container">
      <header className="header">
        <h1>Щоденник мандрівника</h1>
        <div className="user-info">
          {user ? (
            <div className="dropdown">
              <button className="dropbtn">{user.username}</button>
              <div className="dropdown-content">
                <p>ID: {user.user_id}</p>
                <button onClick={handleLogout}>Вийти</button>
              </div>
            </div>
          ) : (
            <Link to="/registration">
              <button className="registration-button">Реєстрація/Вхід</button>
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/posts/new">
              <button className="add-post-button">+</button>
            </Link>
          )}
        </div>
      </header>
      <div className="post-list-container">
        <div className="filter-container">
          <input
            type="text"
            placeholder="Пошук..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <select onChange={(e) => handleSort(e.target.value)}>
            <option value="alphabetic">Сортувати за алфавітом</option>
            <option value="likes">Сортувати за лайками</option>
          </select>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="post-list">
          {filteredPosts && Array.isArray(filteredPosts) && filteredPosts.map(post => (
            <div key={post.id} id={post.id} className="post-item">
              <h3 className="post-title">{post.title}</h3>
              {post.text && <p className="post-text">{post.text}</p>}
              {post.comments && post.comments.length > 0 && (
                <ul className="comment-list">
                  {post.comments.map(comment => (
                    <li key={comment.commentId} className="comment-item">{comment.commentText}</li>
                  ))}
                </ul>
              )}
              <div className="detail-button-box">
                <Link to={`/posts/${post.post_id}`}>
                  <button className="detail-button">Детальніше</button>
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

