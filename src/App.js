// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import ReadingPassage from './components/ReadingPassage';
import { tests } from './components/data';
import logo from './logo.svg'; // Import your logo

function Header() {
  return (
    <header className="app-header">
        <img src={logo} alt="Website Logo" className="logo" />
        <h1>The Best IELTS Practice Test On Computer</h1>
        <p>Real practise, Real score</p>
    </header>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="App">
      {!location.pathname.startsWith('/test/') && <Header />}
      <Routes>
          <Route path="/" element={<Home tests={tests} />} />
          <Route path="/test/:id" element={<ReadingPassage />} />
          {/* ... other routes */}
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
