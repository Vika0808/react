import React, { useState } from 'react';
import './loginPage.css'; 

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
  };

  return (
    <div className="LoginForm">
      <h2>Вхід</h2>
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
  );
};

export default LoginPage;
