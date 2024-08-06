import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import CreateTrip from './components/Trip/CreateTrip';
import JoinTrip from './components/Trip/JoinTrip';
import TripDetails from './components/Trip/TripDetails';
import { initializeTrips } from './data/tripsData'; // Import initialization function
import { useTripContext } from './contexts/TripContext';

const App = () => {
 
  const { user, trips, setTrips } = useTripContext(); // Use context to get user and setTrips

  useEffect(() => {
    if (user) {
      // Initialize trips after user login
      setTrips(initializeTrips());
    }
  }, [user]);





  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <HomePage user={user} trips={trips} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login  />} />
        <Route path="/signup" element={<Signup  />} />
        <Route path="/create-trip" element={user ? <CreateTrip user={user} setTrips={setTrips}/> : <Navigate to="/login" />} />
        <Route path="/join-trip" element={user ? <JoinTrip user={user} /> : <Navigate to="/login" />} />
        <Route path="/trip/:tripId" element={user ? <TripDetails user={user} trips={trips} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
