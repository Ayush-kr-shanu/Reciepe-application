import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const username = Cookies.get('username');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/search">Foody Recipe</Link>
        <ul className="navbar-nav ml-auto">
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/myrecipe">My Recipe</Link>
              </li>
              <li className="nav-item">
                <span className="nav-link">Welcome, {username}!</span>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={onLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
