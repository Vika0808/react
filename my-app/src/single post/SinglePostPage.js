import React, { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useParams, useNavigate, Link } from 'react-router-dom';
import './singlePostPage.css';
import { baseURL } from '../constants';
import rightArrowIcon from './right-arrow.png';

const SinglePostPage = ({isLoggedIn, username}) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', user: {} });
  const [likes, setLikes] = useState(0);
  const [isEditing, setIsEditing] = useState(!postId || postId === 'new');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (postId && postId !== 'new') {
      fetch(`${baseURL}/posts/${postId}`)
        .then(response => response.json())
        .then(data => {
          setPost(data);
          setLikes(data.likes || 0);
          fetchComments(postId);
          checkSubscription(data.user.user_id); 
        })
        .catch(error => {
          console.error('Error fetching post:', error);
          alert('Failed to fetch post');
        });
    }
  }, [postId]);

  const fetchComments = (postId) => {
    fetch(`${baseURL}/comments/post/${postId}`)
      .then(response => response.json())
      .then(data => {
        setComments(data);
      })
      .catch(error => console.error('Error fetching comments:', error));
  };

  const checkSubscription = (userId) => {
    fetch(`${baseURL}/subscriptions/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.token ? { authorization: `Bearer ${localStorage.token}` } : {})
      },
      body: JSON.stringify({ user_id: userId })
    })
      .then(response => response.json())
      .then(data => {
        if (data.isSubscribed) {
          setIsSubscribed(true);
        }
      })
      .catch(error => console.error('Error checking subscription:', error));
  };

  const handleLike = () => {
    setLikes(likes + 1);
    fetch(`${baseURL}/posts/${postId}/like`, {
      method: 'POST',
      headers: {
        ...(localStorage.token ? { authorization: `Bearer ${localStorage.token}` } : {})
      }
    }).catch(error => console.error('Error liking post:', error));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const payload = {
      title: post.title,
      content: post.content,
    };

    if (postId && postId !== 'new') {
      try {
        const response = await fetch(`${baseURL}/posts/${postId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(localStorage.token ? { authorization: `Bearer ${localStorage.token}` } : {})
          },
          body: JSON.stringify(payload)
        });
        if (response.status === 200) {
          setIsEditing(false);
          toast.success('Пост успішно збережено.');
        } else {
          toast.error('Похибка при збереженні посту.');
        }
      } catch (error) {
        toast.error('Похибка при збереженні посту.');
        console.error('Error updating post:', error);
      }
    } else {
      try {
        const response = await fetch(`${baseURL}/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(localStorage.token ? { authorization: `Bearer ${localStorage.token}` } : {})
          },
          body: JSON.stringify(payload)
        });
        console.log(response);
        if (response.ok) {
          toast.success('Пост успішно збережено.');
          setIsEditing(false);
          navigate(`/`);
        } else {
          toast.error('Похибка при збереженні посту.');
        }
      } catch (error) {
        toast.error('Похибка при збереженні посту.');
        console.error('Error creating post:', error);
      }
    }
  };

  const handleSubscribe = () => {
    if (!isSubscribed) {
      console.log(localStorage.token);
      console.log(post.user.user_id);
      fetch(`${baseURL}/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(localStorage.token ? { authorization: `Bearer ${localStorage.token}` } : {})
        },
        body: JSON.stringify({ subscribed_to_user_id: post.user.user_id })
      }).then(response => {
        if (response.ok) {
          setIsSubscribed(true);
        } else {
          alert('Помилка при підписці');
        }
      }).catch(error => console.error('Error subscribing:', error));
    } else {
      alert('Ви вже підписані на цей пост');
    }
  };

  const handleComment = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${baseURL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(localStorage.token ? { authorization: `Bearer ${localStorage.token}` } : {})
        },
        body: JSON.stringify({ post_id: postId, content: newComment })
      });
      if (response.ok) {
        const data = await response.json();
        setComments([...comments, data]);
        setNewComment('');
      } else {
        alert('Failed to add comment.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <>
      <div className="CentralContainer">
        <div className="SinglePost">
          {isEditing ? (
            <form className="EditPostForm" onSubmit={handleSave}>
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
              <Link to="#" onClick={(e) => { setIsEditing(false); e.preventDefault(); }}>Скасувати</Link>
            </form>
          ) : (
            <>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div className="PostUser">
                  <span>Автор: {post.user.username}</span>
                  {
                    isLoggedIn && post.user.username !== username &&
                    <button className="SubscribeButton" onClick={handleSubscribe}>
                      {isSubscribed ? 'Ви підписані' : 'Підписатись'}
                    </button>
                  }
                </div>
                <Link to="/">До списку постів</Link>
              </div>
              <h2 className="PostTitle">{post.title}</h2>
              <hr className="Divider" />
              <div className="PostContent">
                <p>{post.content}</p>
              </div>
              <hr className="Divider" />
              <div className="PostActions">
                {
                  isLoggedIn &&
                  <>
                    <button className="LikeButton" onClick={handleLike}>Лайки ({likes})</button>
                    <button className="CommentButton" onClick={() => setShowComments(!showComments)}>Коментарі</button>
                  </>
                }
                {
                  isLoggedIn && post.user.username === username &&
                  <button className="EditButton" onClick={() => setIsEditing(true)}>Редагувати</button>
                }
              </div>
              {showComments && (
                <div className="CommentsContainer">
                  <form onSubmit={handleComment} className="CommentForm">
                    <div>
                      <label htmlFor="comment"></label>
                      <textarea
                        id="comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="CommentInput"
                      />
                    </div>
                    <button type="submit" className="AddCommentButton">
                      <img src={rightArrowIcon} alt="Додати" className="AddCommentIcon" />
                    </button>
                  </form>
                  <ul className="CommentsList">
                    {comments.map((comment, index) => (
                      <li key={index} className="CommentItem">{comment.content}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SinglePostPage;
