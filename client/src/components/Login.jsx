import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/AuthPage.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // State for Remember Me checkbox
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe, // Include rememberMe in the request body
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwtToken', data.token);
        setMessage(data.message);
        if (data.message === "Login Successful") {
          navigate('/home');
        }
      } else {
        const messageData = await response.json();
        setMessage(messageData.message || 'Authentication failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Internal Server Error');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Login to your account</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Email'
            />
          </label>
          <br />
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='*******'
            />
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>
          <br />
          {message && <p className="error-message">{message}</p>}
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        <p>
          New to MyApp? <Link to="/" style={{textDecoration: 'none'}}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
