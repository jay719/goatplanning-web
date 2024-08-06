import React, { createContext, useState, useContext } from 'react';
import { initializeTrips } from '../data/tripsData'; // Adjust import path as needed

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Dummy login logic
    const authenticatedUser = { id: 'user1', email }; // Example user object
    setUser(authenticatedUser);
    setTrips(initializeTrips()); // Initialize trips after login
  };

  const fetchUserTrips = (userId) => {
    return trips.filter((trip) => trip.memberIds.includes(userId));
  };

  return (
    <TripContext.Provider value={{ user, trips, setTrips, fetchUserTrips, login }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTripContext = () => useContext(TripContext);
