import React from 'react';
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import Authentication from './components/Authentication';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>U2F Demo</h1>
        <Login />
        <Registration />
        <Authentication />
      </header>
    </div>
  );
}

export default App;
