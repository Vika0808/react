import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './singlePostPage.css';
import { baseURL } from '../constants';

const SinglePostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const  [ post ,  setPost ]  =  useState ( {  title : '' ,  content : ''  } ) ;
  const [likes, setLikes] = useState(0);
  const [isEditing, setIsEditing] = useState(!postId || postId === 'new');

  useEffect(() => {
    if (postId && postId !== 'new') {
      fetch(`${baseURL}/posts/${postId}`)
        .then(response => response.json())
        .then(data => {
          setPost(data);
          setLikes(data.likes || 0);
          fetchComments(postId); 
        })
        .catch(error => console.error('Error fetching post:', error));
    }
  }, [postId]);

  const fetchComments = (postId) => {
    fetch(`${baseURL}/comments/post/${postId}`)
      .then(response => response.json())
      .then(data => {
        setPost(prevPost => ({ ...prevPost, comments: data }));
      })
      .catch(error => console.error('Error fetching comments:', error));
  };

  const handleLike = () => {
    setLikes(likes + 1);
    fetch(`${baseURL}/posts/${postId}/like`, {
      method: 'POST'
    }).catch(error => console.error('Error liking post:', error));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (postId && postId !== 'new') {
      try {
        const response = await fetch(`${baseURL}/posts/${postId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(post)
        });
        if (response.ok) {
          setIsEditing(false);
        } else {
          alert('Failed to update post.');
        }
      } catch (error) {
        console.error('Error updating post:', error);
      }
    } else {
      try {
        const response = await fetch(`${baseURL}/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(post)
        });
        if (response.ok) {
          const data = await response.json();
          navigate(`/posts/${data.id}`);
        } else {
          alert('Failed to create post.');
        }
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  return (
    <div className="CentralContainer">
      <div className="SinglePost">
        {isEditing ? (
          <form onSubmit={handleSave}>
            <div>
              <label htmlFor="title">Заголовок посту:</label>
              <input
                type="text"
                id="title"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="content">Текст посту:</label>
              <textarea
                id="content"
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
              />
            </div>
            <button type="submit">Зберегти</button>
          </form>
        ) : (
          <>
            <h2 className="PostTitle">{post.title}</h2>
            <hr className="Divider" />
            <div className="PostContent">
              <p>{post.content}</p>
            </div>
            <hr className="Divider" />
            <div className="PostActions">
              <button className="LikeButton" onClick={handleLike}>Лайки ({likes})</button>
              < button  className = "CommentButton" > Коментарі </button>
              <button className="EditButton" onClick={() => setIsEditing(true)}>Редагувати</button>
            </div>
            {post.comments && Array.isArray(post.comments) && post.comments.length > 0 && (
    <div className="CommentsContainer">
    <h3>Коментарі:</h3>
    <ul className="CommentsList">
      {post.comments.map((comment, index) => (
        <li key={index} className="CommentItem">{comment.content}</li>
      ))}
    </ul>
  </div>
)}
          </>
        )}
      </div>
    </div>
  );
};

export default SinglePostPage;
