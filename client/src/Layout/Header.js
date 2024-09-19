import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        {/* <img src="/path-to-your-logo.png" alt="Task Scheduler Logo" className="logo" /> */}
        <h1>Task Scheduler</h1>
      </div>
      
      <nav className="header-nav">
        <ul>
          <li>
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li>
            <Link to="/register" className="nav-link">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
