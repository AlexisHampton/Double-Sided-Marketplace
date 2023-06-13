import React, { useEffect, useState } from "react";
import { GoogleButton } from "react-google-button";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential)
      navigate('/dashboard');
    }).catch((error) =>{
      console.log(error)
    })
  }

  return (
    <div className="SignInDiv">
      <div className="SignInContainer">
        <h1 className="Signin" style={{ color: "#001f3f" }}>
          Sign In
        </h1>
        <div className="GoogleButton">
          <GoogleButton  />
        </div>
        <form onSubmit={signIn}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
