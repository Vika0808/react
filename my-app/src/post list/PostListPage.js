import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './postListStyles.css';
import axios from 'axios';
import { baseURL } from '../constants';

const PostListPage = ({isLoggedIn}) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getPosts = async () => {
    try {
      const res = await axios.get(`${baseURL}/posts`);
      console.log(res.data);
      setPosts(res.data);
      setFilteredPosts(res.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to fetch posts');
    }
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
    getPosts();
  }, []);

  return (
    <>
      { 
        isLoggedIn && 
            <Link to="/posts/new">
                <button className="add-post-button">+</button>
            </Link>
      }
      <div className="page-container">
        <div className="post-list-container">
          <div className="filter-container">
            <div>
              <input
                type="text"
                placeholder="Пошук..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div>
              <select onChange={(e) => handleSort(e.target.value)}>
                <option value="alphabetic">Сортувати за алфавітом</option>
                <option value="likes">Сортувати за лайками</option>
              </select>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="post-list">
            {filteredPosts && Array.isArray(filteredPosts) && filteredPosts.map(post => (
              <div key={post.post_id} id={post.post_id} className="post-item">
                <div>
                <h3 className="post-title">{post.title}</h3>
                </div>
                {<p className="post-text">{post.content}</p>}
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
    </>
  );
};

export default PostListPage;
