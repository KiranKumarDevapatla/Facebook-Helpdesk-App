import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/AuthPage.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false); 

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          rememberMe,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        if (data.message === 'User registered successfully') {
          navigate('/login');
        }
      } else {
        const messageData = await response.json();
        setMessage(messageData.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('Internal Server Error');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Create Account</h2>
        <form onSubmit={handleSignUp} className="auth-form">
          <label>
            Name
            <input
            placeholder='Name'
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Email
            <input

placeholder='Email'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Password
            <input
            placeholder='********'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
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
            Sign Up
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  ); 
};

export default SignUp;
