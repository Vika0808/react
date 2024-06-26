import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { baseURL } from '../constants';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    role: 'user', // Додаємо поле для ролі
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...values } = formData;

    console.log(formData);
    const result = await fetch(`${baseURL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values)
    });

    const data = await result.json();
    console.log(data);

    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
      role: 'user',
      rememberMe: false,
    });
  };

  return (
    <div className="RegistrationForm">
      <h2>Реєстрація</h2>
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
            Електронна пошта:
            <input
              type="email"
              name="email"
              value={formData.email}
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
            Підтвердіть пароль:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="FormField"
            />
          </label>
        </div>
        <div>
          <label>
            Дата народження:
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="FormField"
            />
          </label>
        </div>
        <div>
          <label>
            Роль:
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="FormField"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
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
        <button type="submit" disabled={formData.password !== formData.confirmPassword} className="FormButton">Зареєструватися</button>
      </form>
      <p>Вже зареєстровані? <Link to="/login">Увійти</Link></p>
    </div>
  );
};

export default RegistrationPage;
