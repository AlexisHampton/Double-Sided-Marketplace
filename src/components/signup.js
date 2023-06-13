import React, { useEffect, useState } from "react";
import { GoogleButton } from "react-google-button";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async (e) => {
    e.preventDefault();
    try{
        await createUserWithEmailAndPassword(auth, email, password)
    } catch(error){
        console.log(error);
    }
    
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
        <form onSubmit={signUp}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
