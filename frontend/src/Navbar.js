import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import isLoggedIn from "./helpers/auth.js";

import './Navbar.css';
function Navbar() {
  return (
    <nav >
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn() ? (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        ) : (
          <>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        </>)}
        <li>
          <Link to="/tvshows">Tv shows</Link>
        </li>
      </ul>
    </nav>
  );
}

 
export function HomePage() {
    return <h1>Home</h1>;
    }
  
 export function LoginPage() {

    // return (
    //     <div>
    //         <fonrm action = "checkLogin">    
    //             <label for = "login">Username</label>
    //             <input type = "text" name="login"/>
    //             <label for = "password">password</label>
    //             <input type = "password" name="password"/>
    //             <input type = "submit" />
    //         </form>
    //     </div>
    // ) 

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');

    const handleSubmit= (event) => {
        if(isLoggedIn()) {
          alert('you are already logged in');
          window.location.href = '/';
          return;
        }
        console.log(`${email}`);
        console.log(`${password}`);
        event.preventDefault();
        fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': `${email}`,
                'password': `${password}`
              })
          })
          .then(response => {
            if (response.ok) {
              // user is authenticated, extract the JWT token from the response body
              // toast.success('Succesfully Logged In');
              return response.json().then(data => {
                localStorage.setItem('token', data.token);
                alert(data['message']);
                window.location.href = '/';
                // redirect to the home page or some other protected route
              });
            } else {
              // authentication failed, show an error message
              return response.json().then(data => {
                alert(data['message']);
              });
              // throw new Error('Authentication failed');
            }
          })
          .catch(error => {
            alert(error);
          });
        }
        

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type = "password" value = {password} onChange = {(event) => setPassword(event.target.value)} />
            </label>
            <button type = "submit">Login</button>
        </form>
    );

}
  
  export function SignUpPage() {

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const handleSubmitEvent = (e) => {
      e.preventDefault();
      console.log('First Name =' + `${firstName}`);
      fetch('/signup', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          dateOfBirth: dateOfBirth
        })
      }).then((res)=>res.json())
        .then((data) => {
          if(data['success']){
            toast.success(data['message'], {
              onClose: () =>{
                window.location.href = '/login';
              }
            });
           
          }else{
            toast.error(data['message']);
          }
          console.log(data);
        })
        .catch((error)=> {
          console.error(error);
        })
    }
    return (
      <form onSubmit = {handleSubmitEvent}>
          <label>
            First name
            <input type = 'text' value = {firstName} onChange = {(event) => setFirstName(event.target.value)}/>
          </label>
          <br />
          <label>
            Last Name
            <input type = 'text' value = {lastName} onChange = {(event) => setLastName(event.target.value)}/>
          </label>
          <br />
          <label>
            Email
            <input type = 'text' value = {email} onChange = {(event) => setEmail(event.target.value)}/>
          </label>
          <br />
          <label>
            Password
            <input type = "password" value = {password} onChange = {(event) => setPassword(event.target.value)} />
          </label>
          <br />
          <label>
            Date Of Birth 
            <input type = "date" value = {dateOfBirth} onChange = {(event) => setDateOfBirth(event.target.value)} />
          </label>
          <br />
          <button type = "submit">Sign In</button>
          <ToastContainer />
      </form>
    )
  }

  export function Tvshows (){
    console.log('this code gets  executed');
    useEffect(() => {
    fetch('/tvshows',
      {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' +  localStorage.getItem('token'),
          'content': 'applicattion/json'
        }
      }
    ).then(response => {
      if(response.ok){
        return response.json.then((data) => {
          alert(data['message']);
        })
      }
      else{
        alert('Please login and then access');
        window.location.href = '/';

      }

    }).then(data=> console.log(data))
    .catch(error => {
      console.log(error);
    })}, []);
    return(
        <h1>Hello Bossman</h1>
      )
  }

  export function Logout (){
    alert('succesfully logged out');
    fetch('/logout',
    {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' +  localStorage.getItem('token'),
        'content': 'applicattion/json'
      }
    }).then((response) => {
      if(response.ok){
        localStorage.removeItem('token'); // clear the token from local storage
        window.location.href = '/';
      }
      else{
        alert('There is an error');
      }
    })
    return(
    <h2></h2>);
  }
  
export default Navbar;
