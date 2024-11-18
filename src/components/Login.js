import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase'; 
import { signInWithEmailAndPassword } from "firebase/auth"; 
import '../styles/Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password); 
      console.log('Logged in successfully');
      navigate('/');
    } catch (error) {
      console.error('Error logging in', error);
      alert(error.message); 
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <form onSubmit={handleLogin} className="login-form">
        <div className="header">
          <h2>Login</h2>
          <span 
            className="sign-up" 
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </div>
        <div>
          <label htmlFor="email">Your email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Your password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
