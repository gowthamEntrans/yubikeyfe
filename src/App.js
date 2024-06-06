import React from 'react';
import './App.css';
import Register from './components/Register';
import Authenticate from './components/Authenticate';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>WebAuthn Demo</h1>
        <Register />
        <Authenticate />
      </header>
    </div>
  );
}

export default App;
