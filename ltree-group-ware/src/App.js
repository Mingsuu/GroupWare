/*eslint-disable*/
import React from 'react';
import './App.css';
import Loginpage from './Login/login';
import Idfind from './Login/Idfind';
import Passfind from './Login/passfind';
import { BrowserRouter } from 'react-router-dom';


function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Loginpage/>
      </div>
    </BrowserRouter>
  );
}

export default App;
