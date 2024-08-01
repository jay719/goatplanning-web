import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import CreateTrip from './components/Trip/CreateTrip';
import JoinTrip from './components/Trip/JoinTrip';
import TripDetails from './components/Trip/TripDetails';
import { initializeTrips } from './data/tripsData'; // Import initialization function

const App = () => {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    if (user) {
      // Initialize trips after user login
      setTrips(initializeTrips());
    }
  }, [user]);

  const handleLogin = (email, password) => {
    // Fake user data
    const fakeUser = {
      id: 'user1',
      email,
    };
    setUser(fakeUser);
  };

  const handleSignup = (email, password) => {
    // Simulate signup
    setUser({ id: 'user1', email });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <HomePage user={user} trips={trips} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route path="/create-trip" element={user ? <CreateTrip user={user} /> : <Navigate to="/login" />} />
        <Route path="/join-trip" element={user ? <JoinTrip user={user} /> : <Navigate to="/login" />} />
        <Route path="/trip/:tripId" element={user ? <TripDetails user={user} trips={trips} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
