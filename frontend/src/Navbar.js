import React, { useState } from "react";

import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';


import './Navbar.css';
function Navbar() {
  return (
    <nav >
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
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

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');

    const handleSubmit= (event) => {
        console.log(`${username}`);
        console.log(`${password}`);
        event.preventDefault();
        fetch('/api/formdata', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': 'helo',
                'password': 'password'
              })
          })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));
        }
        

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
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
          firstName: `${firstName}`,
          lastName: `${lastName}`,
          email: `${email}`,
          password: `${password}`,
          dateOfBirth: `${dateOfBirth}`
        })
      }).then((res)=>res.json())
        .then((data) => {
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
      </form>
    )
  }
  
export default Navbar;
