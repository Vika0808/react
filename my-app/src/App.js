import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostListPage from './post list/PostListPage';
import SinglePostPage from './single post/SinglePostPage';
import RegistrationPage from './registration page/RegistrationPage'; 
import LoginPage from './registration page/LoginPage'; 
import './styles.css'; 

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/posts/:postId" element={<SinglePostPage />} />
          <Route path="/posts" element={<PostListPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} /> {}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
