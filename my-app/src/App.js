import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';
import PostListPage from './PostListPage';
import SinglePostPage from './SinglePostPage';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Реєстрація</Link>
            </li>
            <li>
              <Link to="/posts">Пости</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/posts/:postId" element={<SinglePostPage />} />
          <Route path="/posts" element={<PostListPage />} />
          <Route path="/" element={<RegistrationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;