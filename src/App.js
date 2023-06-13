import logo from './logo.svg';
import './App.css';
import { Link } from "react-router-dom";

export function App() {
  return (
   <article className='homePage'>
    <h1 className='signupHeader'>Ready to PlugIn</h1>
    <p>Join now to the biggest platform for aspiring Software Engineers to <br/> showcase their skills and build your dream project</p>
    <Link to='/signup'><button className='signup'>Sign up</button></Link>
   </article>
  );
}

export function Header() {
  return(
    <header>
      <img width={250} src={require('./images/logo.png')} alt='logo' />
    </header>
  )
}

export function Footer(){
  return(
    <footer>
      <small>Made with Love by Alexsis, Jevi, and Anthony</small>
    </footer>
  )
}

export function Dashboard(){
  var Entreprenuer = true;
  if(Entreprenuer){
    //Get their information and 
    //their projects sorted from Completed to Pending to Posted
    return(
      <article className='dashboardPage'>
        <h2 style={{textAlign:'center'}}> Your Dashboard </h2>
            <section className='tasks'>
              <section className='task'>
                
                <img class="profile-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW8ovVhlab2zXGBJvntRbwEKxHtloAX1fdmFFRk9c&s"/>
                
                <section>
                  <h3> Project Title </h3>
                  <p> from: Google </p>
                </section>
                <section>
                <h3> Due Date </h3>
                <p> actual date </p>
                </section>
                <section>
                  <h3> Status </h3>
                  <p> Incomplete </p>
                </section>
                <button style={{marginTop:'0px'}}>View Project</button>
              </section>
            </section>
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

export function Project(){
  //GET PROJECT INFO
  var Entreprenuer = false;
  var complete = false;
  var status = 'Approved';
  return(
    <article className='projectPage'>
      <section className='projectProfile'>
        <img style={{margin: '0 auto'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW8ovVhlab2zXGBJvntRbwEKxHtloAX1fdmFFRk9c&s"/>
        <section style={{textAlign:'left'}}>
        <h3> Project title </h3>
        <p> company name </p>
        </section>
      </section>
      <section className='projectDetails'>
      <h4>Description</h4>
      <p>Project Description</p>
      <h4> Solution </h4>
      <input type="file" />
      <h4> Status </h4>
      <p>Incomplete</p>
      </section>
    </article>
  )
}

export function SignUp(){
  return(
    <article>
      <section>
        <input type='text' placeholder='Email...' required/>
        <input type='password' placeholder='Password...' required/>
        <button>SignUp</button>
      </section>
    </article>
  )
}

export function Profile(){


  //PULL USER INFORMATION TO DISPLAY AT RETURN
  //NEED FIREBASE FIRST
  return(
    <article>
      <section>
        <img alt='pfplogo'/>
        <section>
          <h1>Anthony Nino De Guzman</h1>
          <i>Queens, NY</i>
          <p>Queens College Graduate</p>
          <small>Skills: JavaScript HTML CSS and STUFF</small>
        </section>
      </section>

      <section>
        <h2>About</h2>
        <p>DASFPAIFAWFWA</p>
      </section>
      <section>
        <h2>Projects</h2>
        <section>
          <p>Projects go here</p>
        </section>
      </section>
    </article>
  )
}

export default App;
