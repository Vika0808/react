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
      sub.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSubscriptions(filtered);
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <>
      <div className="page-container">
        <header className="header">
          <h1>Підписки</h1>
          <Link to="/" className="back-button">
            Назад до постів
          </Link>
        </header>
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
              <div key={sub.id} id={sub.id} className="subscription-item">
                <h3 className="subscription-title">{sub.title}</h3>
                {sub.content && <p className="subscription-content">{sub.content}</p>}
                <div className="detail-button-box">
                  <Link to={`/subscriptions/${sub.id}`}>
                    <button className="detail-button">Детальніше</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionListPage;
