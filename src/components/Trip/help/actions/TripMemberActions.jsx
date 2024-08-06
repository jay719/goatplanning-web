import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText, Typography, TextField, Checkbox, FormControlLabel, Box } from '@mui/material';

const TripMemberActions = ({ trip, user }) => {
  const [newThread, setNewThread] = useState('');
  const [completedRequirements, setCompletedRequirements] = useState({});

  const handleLeaveTrip = () => {
    // Logic to leave the trip
    if (trip.removeMember) {
      trip.removeMember(user.id); // Assuming removeMember method takes user ID
    }
  };

  const handleStartThread = () => {
    if (newThread.trim()) {
      // Logic to start a question thread
      if (trip.addThread) {
        trip.addThread(user.id, newThread); // Assuming addThread method takes user ID and thread content
      }
      setNewThread(''); // Clear the input field
    }
  };

  const handleMarkRequirement = (requirementId, checked) => {
    // Logic to mark a requirement as met
    if (trip.markRequirementAsMet) {
      trip.markRequirementAsMet(user.id, requirementId, checked); // Assuming markRequirementAsMet method takes user ID, requirement ID, and completion status
    }
    setCompletedRequirements((prevState) => ({
      ...prevState,
      [requirementId]: checked
    }));
  };

  const RequirementList = ({ trip, completedRequirements, handleMarkRequirement }) => {
    const requirements = trip.requirements ? Object.entries(trip.requirements) : [];

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {requirements.map(([id, requirement]) => (
          <ListItem key={id} sx={{ width: '100%', justifyContent: 'space-between', paddingX: 2 }}>
            <ListItemText primary={`${requirement.category}: `} />
            <FormControlLabel
              control={
                <Checkbox
                  checked={completedRequirements[id] || false}
                  onChange={(e) => handleMarkRequirement(id, e.target.checked)}
                />
              }
              label={completedRequirements[id] ? 'Completed' : 'Not Completed'}
            />
          </ListItem>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ marginTop: 4, padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Your Actions
      </Typography>
      
      <List>
        <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: 2 }}>
          <ListItemText primary="Mark requirements as met" />
          <RequirementList trip={trip} completedRequirements={completedRequirements} handleMarkRequirement={handleMarkRequirement} />
        </ListItem>
        
        <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: 2 }}>
          <ListItemText primary="Start a question thread" />
          <TextField
            value={newThread}
            onChange={(e) => setNewThread(e.target.value)}
            label="New Thread"
            variant="outlined"
            size="small"
            sx={{ width: '100%', marginBottom: 1 }}
          />
          <Button
            onClick={handleStartThread}
            variant="contained"
            color="primary"
            sx={{ width: '100%' }}
          >
            Start Thread
          </Button>
        </ListItem>
      </List>

      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleLeaveTrip} 
        sx={{ marginTop: 2, width: '100%' }}
      >
        Leave Trip
      </Button>
    </Box>
  );
};

export default TripMemberActions;
