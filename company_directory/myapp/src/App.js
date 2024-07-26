import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import CompanyList from './CompanyList';
import CompanyDetails from './CompanyDetails';

const AppHeader = () => {
  const location = useLocation();

  return (
    <header className="App-header">
      <nav className="navbar">
        <div className="navbar-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Company List</Link>
        </div>
      </nav>
    </header>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/companydetails/:id" element={<CompanyDetails />} />
            <Route path="/" element={<CompanyList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
