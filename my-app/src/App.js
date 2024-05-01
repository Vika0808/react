// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';
import PostListPage from './PostListPage';
import SinglePostPage from './SinglePostPage';
import './styles.css'; // Імпортуємо стилі

function App() {
  return (
    <Router>
      <div>
        <div>
          <header className="header">
            <h1>Мій блог</h1>
            <nav>
              <ul className="nav-list">
                <li className="nav-item">
                  <Link to="/posts" className="nav-link">Пости</Link>
                </li>
              </ul>
            </nav>
            <Link to="/registration" className="registration-link">Реєстрація</Link>
          </header>
          <Routes>
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/posts/:postId" element={<SinglePostPage />} />
            <Route path="/posts" element={<PostListPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
