import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import ContactList from './ContactList.js';  
import ContactDetails from './ContactDetails.js'


function App() {
  
  const[pathname,setPathname] = React.useState("")
  useEffect(()=>{setPathname(window.location.pathname)},[window.location.pathname ])


  const handleLinkClick = (path) => {
    if (pathname !== path) {
      window.location.href = path;
    }
  };
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <button className="navbar-brand" onClick={() => handleLinkClick('/')}>
              <span className="highlight">Vanaja Labs</span>
            </button>
            <div className="navbar-links">
              <Link to="/" onClick={() => handleLinkClick('/')} className={pathname === '/' ? 'active' : ''}>ContactList</Link>
              <Link to="/ContactDetails" onClick={() => handleLinkClick('/ContactDetails')} className={pathname === '/ContactDetails' ? 'active' : ''}>ContactDetails</Link>
            </div>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<ContactList />} />
            <Route path="/ContactDetails" element={<ContactDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
