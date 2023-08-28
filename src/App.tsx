import React from 'react';
import Login from './components/Login/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Weather App Client.</p>
      </header>
      <main>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <Login />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
