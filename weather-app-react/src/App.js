import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import OutfitHistory from './components/OutfitHistory';
import Weather from './components/Weather';
import './App.css';

function PrivateRoute({ children, authToken }) {
  return authToken ? children : <Navigate to="/login" />;
}

function App() {
  const [authToken, setAuthToken] = useState(null);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
        <Route
          path="/"
          element={
            <PrivateRoute authToken={authToken}>
              <Weather />
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute authToken={authToken}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute authToken={authToken}>
              <OutfitHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/weather"
          element={
            <PrivateRoute authToken={authToken}>
              <Weather />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
