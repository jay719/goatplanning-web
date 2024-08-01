import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, CardActions } from '@mui/material';

const HomePage = ({ user, trips }) => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    if (user) {
      const filteredTrips = trips.filter((trip) => trip.memberIds.includes(user.id));
      setUserTrips(filteredTrips);
    }
  }, [user, trips]);

  const handleViewTrip = (tripId) => {
    navigate(`/trip/${tripId}`);
  };

  return (
    <Container 
      maxWidth="xs" 
      sx={{ 
        marginTop: 8, 
        padding: 2, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to GoatPlanning
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/create-trip')} 
        sx={{ marginTop: 2, width: '100%' }}
      >
        Create a Trip
      </Button>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => navigate('/join-trip')} 
        sx={{ marginTop: 2, width: '100%' }}
      >
        Join a Trip
      </Button>

      <Typography 
        variant="h5" 
        component="h2" 
        sx={{ marginTop: 4, width: '100%' }} 
        gutterBottom
      >
        Your Trips
      </Typography>
      {userTrips.length === 0 ? (
        <Typography variant="body1" gutterBottom>
          You are not associated with any trips.
        </Typography>
      ) : (
        userTrips.map((trip) => (
          <Card key={trip.id} sx={{ marginTop: 2, width: '100%' }}>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                {trip.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {trip.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Destination: {trip.destination}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleViewTrip(trip.id)} sx={{ width: '100%' }}>
                View Trip
              </Button>
            </CardActions>
          </Card>
        ))
      )}
    </Container>
  );
};

export default HomePage;
