import { useState, useEffect } from 'react';
import {  googleProvider } from '../config/firebase';
import { getAuth , createUserWithEmailAndPassword , signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { db } from '../config/firebase';
import { getDocs, addDoc, collection, query, where } from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    if(auth.currentUser == null){
      console.log(auth.currentUser);
      return <Navigate to="/" />;
    }
    
    var Entreprenuer = true;
  if(Entreprenuer){
    //Get their information and 
    //their projects sorted from Completed to Pending to Posted
    return(
      <article>
        <h1>Dashboard</h1>
        <h2>Posted Projects</h2>
        <section>
          <section>
            <img alt='Company'/>
            <strong>Project Name</strong>
            <p>Company Name</p>
            <i>Skills</i>
          </section>
        </section>
        <h2>Post Project</h2>
        <form>
          <input type='text' placeholder='Project Title' />
          <textarea placeholder='Project Details' />
          <button>Upload</button>
        </form>
      </article>
    )
  }
  else return(
    <article>
      <h1>Dashboard</h1>
      <p>We have found <span>10</span> projects that match your skills</p>
      <section>
        <section>
          <img alt='Company'/>
          <strong>Project Name</strong>
          <p>Company Name</p>
          <i>Skills</i>
          <small>Due 11/07</small>
        </section>
      </section>
    </article>
  )
}

export const LogIn = () => {


    return(
        <article>
          <section>
            <input type='text' placeholder='Email...' required/>
            <input type='password' placeholder='Password...'required/>
            <button >Log In</button>
          </section>
          <button > Log in with Google </button>
        </article>
    )
}

export const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    let auth = getAuth();

    

    const allUsersRef = collection(db, 'Users'); 
    if(!auth){
      console.log(auth)
    }

    const getUserlist = async () => {
        try{
            const data = await getDocs(allUsersRef);
            const filteredData = data.docs.map((doc) =>  ({
                ...doc.data(), 
                id: doc.id
            }));
            console.log(filteredData)
        } catch (err) {
            console.error(err);
        }
    };

    

    const signIn = async () => {
        getUserlist();
        const emailRoster = query(allUsersRef, where("email", "==", email))
        console.log(emailRoster);
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            console.log({email})
            await addDoc(allUsersRef, {
                email: email,
                password: password,
                role: role
            })
            if(auth.currentUser){
                 return <Navigate to="/" />;
            }
        } catch (err) {
            console.error(err);
        }
        
        
    };

    const googleSignIn = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    }

    const logout = async () => {
        try{
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }
    return(
        <article>
          <section className='signupPage'>
          <button className='googleButton' onClick={googleSignIn}> Sign in with Google </button>
          <br /> 
          <small>or</small>
          <br/>
            <input type='email' placeholder='Email...' onChange={(e) => setEmail(e.target.value)} required/>
            <br />
            <input type='password' placeholder='Password...' onChange={(e)=> setPassword(e.target.value)} required/>
             <p>You are a:</p>
             <input type='radio' name='userType' id='rad1' value='student' onChange={(e) => setRole(e.target.value)}/>
             <label forhtml='rad1'>Student</label>

             <input type='radio' name='userType' id='rad1' value='company' onChange={(e) => setRole(e.target.value)} />
             <label forhtml='rad1'>Company</label> 
             <br />
            <button onClick={signIn}>Sign Up</button>
          </section>
          
          <button onClick={logout}>Logout</button>
        </article>
      )
}