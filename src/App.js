import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import AppNavbar from './features/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppNavbar/>
      </header>
    </div>
  );
}

export default App;
