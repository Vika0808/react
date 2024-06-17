import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './subscriptionPage.css';
import axios from 'axios';
import { baseURL } from '../constants';

const SubscriptionListPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getSubscriptions = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${baseURL}/subscriptions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubscriptions(res.data);
      setFilteredSubscriptions(res.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      setError('Failed to fetch subscriptions');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = subscriptions.filter(sub =>
      sub.subscribedToUser && sub.subscribedToUser.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSubscriptions(filtered);
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

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
          {filteredSubscriptions && Array.isArray(filteredSubscriptions) && filteredSubscriptions.map(sub => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionListPage;
