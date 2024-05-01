import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostListPage from './PostListPage';
import SinglePostPage from './SinglePostPage';
import RegistrationPage from './RegistrationPage'; 
import './styles.css'; 

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/posts/:postId" element={<SinglePostPage />} />
          <Route path="/posts" element={<PostListPage />} />
          <Route path="/registration" element={<RegistrationPage />} /> {}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
