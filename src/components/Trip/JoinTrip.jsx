import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const JoinTrip = ({ user }) => {
  const [inviteCode, setInviteCode] = useState('');
  const navigate = useNavigate();

  const handleJoinTrip = () => {
    // Handle joining trip logic, possibly involving user information
    const tripId = inviteCode.trim(); // Extract trip ID from invite code
    console.log(`${user.email} is joining trip: ${tripId}`);
    navigate(`/trip/${tripId}`);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Join a Trip
      </Typography>
      <form>
        <TextField
          label="Trip Invite Code"
          fullWidth
          margin="normal"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleJoinTrip} sx={{ marginTop: 2 }}>
          Join Trip
        </Button>
      </form>
    </Container>
  );
};

export default JoinTrip;
