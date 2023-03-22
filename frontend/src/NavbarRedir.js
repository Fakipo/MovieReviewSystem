import React from "react";
import { HomePage, LoginPage, SignUpPage }  from "./Navbar.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Navbar.js";

let NavbarRedir = () =>{
        return (
            <Router>
              <div>
                <Navbar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                </Routes>
              </div>
            </Router>
          );
        }      
    
    export default NavbarRedir;
