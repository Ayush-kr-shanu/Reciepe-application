import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from './Components/Navbar';
import LoginForm from './Components/Loginform';
import SignupForm from './Components/SignupForm';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('token'));
  const [username, setUsername] = useState('')
  const [posts, setPosts] = useState([]);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    Cookies.set('username', username, { expires: 7 });
  };
  

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    setIsLoggedIn(false);
    setUsername('');
    window.location.href = '/';
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} username={username}/>
      <Routes>
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Router>
  );
};

export default App;
