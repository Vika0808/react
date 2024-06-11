import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostListPage from './post list/PostListPage';
import SinglePostPage from './single post/SinglePostPage';
import RegistrationPage from './registration page/RegistrationPage';
import LoginPage from './registration page/LoginPage';
import SubscriptionPage from './SubscriptionPage/SubscriptionPage';
import './styles.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/posts/:postId" element={<SinglePostPage />} />
          <Route path="/" element={<PostListPage isLoggedIn={isLoggedIn} username={username} />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
          <Route path="/subscriptions" element={<SubscriptionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
