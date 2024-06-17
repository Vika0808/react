import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './subscriptionPage.css';
import axios from 'axios';
import { baseURL } from '../constants';
import { jwtDecode } from 'jwt-decode';

const SubscriptionListPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    console.log(token);
    console.log(decoded);
    if (decoded.role === 'admin') {
      setIsAdmin(true);
      getUsers();
    } else {
      getSubscriptions();
    }
  }, []);

  const getUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${baseURL}/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    }
  };

  const getSubscriptions = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${baseURL}/subscriptions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubscriptions(res.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      setError('Failed to fetch subscriptions');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = isAdmin
      ? users.filter(user => user.username.toLowerCase().includes(e.target.value.toLowerCase()))
      : subscriptions.filter(sub => sub.subscribedToUser && sub.subscribedToUser.username.toLowerCase().includes(e.target.value.toLowerCase()));
    isAdmin ? setUsers(filtered) : setSubscriptions(filtered);
  };

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${baseURL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter(user => user.user_id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user');
    }
  };

  return (
    <div className="page-container">
      <div className="subscription-list-container">
        <div className="filter-container">
          <input
            type="text"
            placeholder="Пошук..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="subscription-list">
          {isAdmin ? (
            users.map(user => (
              <div key={user.user_id} className="subscription-item">
                <h3 className="subscription-title">{user.username}</h3>
                {user.bio && <p className="subscription-content">{user.bio}</p>}
                <div className="detail-button-box">
                  <Link to={`/users/${user.user_id}`}>
                    <button className="detail-button">Переглянути профіль</button>
                  </Link>
                  <button onClick={() => deleteUser(user.user_id)} className="delete-button">Видалити</button>
                </div>
              </div>
            ))
          ) : (
            subscriptions.map(sub => (
              sub.subscribedToUser && (
                <div key={sub.subscription_id} className="subscription-item">
                  <h3 className="subscription-title">{sub.subscribedToUser.username}</h3>
                  {sub.subscribedToUser.bio && <p className="subscription-content">{sub.subscribedToUser.bio}</p>}
                  <div className="detail-button-box">
                    <Link to={`/users/${sub.subscribedToUser.user_id}`}>
                      <button className="detail-button">Переглянути профіль</button>
                    </Link>
                  </div>
                </div>
              )
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionListPage;
