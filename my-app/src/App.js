import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';

import PostListPage from './post list/PostListPage';
import SinglePostPage from './single post/SinglePostPage';
import RegistrationPage from './registration page/RegistrationPage';
import LoginPage from './registration page/LoginPage';
import SubscriptionPage from './SubscriptionPage/SubscriptionPage';
import MasterLayout from './components/MasterLayout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    setIsLoggedIn(token !== null);
    setUsername(storedUsername);
  }, []);

  return (
    <Router>
      <MasterLayout isLoggedIn={isLoggedIn} username={username} onLogout={() => {setIsLoggedIn(false); setUsername('');}}>
        <Routes>
          <Route path="/posts/:postId" element={<SinglePostPage isLoggedIn={isLoggedIn} username={username}/>} />
          <Route path="/" element={<PostListPage isLoggedIn={isLoggedIn}/>} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
          <Route path="/subscriptions" element={<SubscriptionPage />} />
        </Routes>
      </MasterLayout>
    </Router>
  );
}

export default App;
