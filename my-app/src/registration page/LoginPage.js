import React, { useState } from 'react';
import './loginPage.css'; 
import { baseURL } from '../constants';
import travel from '../travel.jpg';


const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const validateForm = () => {
    if (!formData.username || !formData.password) {
      setError('Заповніть всі поля');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Логін або пароль невірні');
      }

      const result = await response.json();
      console.log(result);
      localStorage.setItem('token', result.access_token);
      window.location.href = '/';
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
    <div className="page-image">
      <img src={travel} alt="Background" />
    </div>
    <div className="LoginForm">
      <h2>Вхід</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Ім'я користувача:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="FormField"
            />
          </label>
        </div>
        <div>
          <label>
            Пароль:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="FormField"
            />
          </label>
        </div>
        <div>
          <label>
            Запам'ятати мене:
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="RememberMeCheckbox"
            />
          </label>
        </div>
        <button type="submit" className="FormButton">Увійти</button>
      </form>
    </div>
    </>
  );
};

export default LoginPage;
