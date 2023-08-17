import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from './Components/Navbar';
import LoginForm from './Components/Loginform';
import SignupForm from './Components/SignupForm';
import Search from './Components/Seacrh';
import AuthGuard from './AUthguard';
import MyRecipe from './Components/Myrecipe';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('token'));
  const [username, setUsername] = useState('')

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
        <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupForm />} />
        {/* Use the AuthGuard for the Search route */}
        <Route
          path="/search"
          element={<AuthGuard isLoggedIn={isLoggedIn}><Search /></AuthGuard>}
        />
        <Route
          path="/myrecipe"
          element={<AuthGuard isLoggedIn={isLoggedIn}><MyRecipe /></AuthGuard>}
        />
      </Routes>
      
    </Router>
  );
};

export default App;
