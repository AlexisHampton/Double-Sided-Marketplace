import React, { Fragment } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App, Footer, Profile, Project, Header, Dashboard} from './App';
import {SignIn} from './components/signin'
// import {SignUp} from './components/signup'
import AuthDetails from './components/AuthDetails';
import { Auth, LogIn } from './components/auth';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path='/' element={
      <React.Fragment>
        <Header />
        <App />
        <Footer />
      </React.Fragment>
      }/>

      <Route path='/signin' element={
      <React.Fragment>
        <Header />
        <SignIn />
        <AuthDetails />
        <Footer />
      </React.Fragment>
      }/>

      <Route path='/signup' element={
      <React.Fragment>
        <Header />
        <Auth />
        <Footer />
      </React.Fragment>
      }/>

      <Route path='/login' element={
      <React.Fragment>
        <LogIn />
        <Footer />
      </React.Fragment>
      }/>

      <Route path='/Dashboard' element={
        <React.Fragment>
          <Header />
          <Dashboard />
          <Footer />
        </React.Fragment>
      }/>

      <Route path='/Profile' element={
        <React.Fragment>
          <Profile />
          <Footer />
        </React.Fragment>
      }/>

      <Route path='/Project' element={
        <React.Fragment>
          <Header />
          <Project />
          <Footer />
        </React.Fragment>
      }/>

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
