import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../utils/firebase'; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; 
import '../styles/SignUp.css'; 

const SignUp = () => {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; 

      
      await setDoc(doc(db, "users", user.uid), { 
        name: name,
        email: email,
        
      });

      console.log('User created successfully');
      navigate('/login'); 
    } catch (error) {
      console.error('Error signing up', error);
      alert(error.message); 
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <form onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
        <div>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        <div>
          <span onClick={() => navigate('/login')}>Back to Login</span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
