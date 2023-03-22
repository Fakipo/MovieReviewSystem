import React, { useState } from "react";

import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
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
            <button type = "submit">Submit</button>
        </form>
    );

}
  
  export function SignUpPage() {
    return <h1>Contact us</h1>;
  }
  
export default Navbar;
