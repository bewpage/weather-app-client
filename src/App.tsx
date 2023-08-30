import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './store/auth';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Form from './components/UserAuth/Form';
import Dashboard from './components/Dashboard/Dashboard';

import './App.css';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Form />} />
                  <Route path="/signup" element={<Form />} />
                  <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Route>
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
