import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';

const MakeThisTripHappen = ({ trip }) => {
  const [userGoals, setUserGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setUserGoals([...userGoals, newGoal]);
      setNewGoal('');
    }
  };

  return (
    <div>
      <Typography variant="h5">Make This Trip Happen</Typography>
      <List>
        {userGoals.map((goal, index) => (
          <ListItem key={index}>
            <ListItemText primary={goal} />
          </ListItem>
        ))}
      </List>
      <TextField
        label="Add a new goal or necessity"
        fullWidth
        value={newGoal}
        onChange={(e) => setNewGoal(e.target.value)}
        sx={{ marginTop: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleAddGoal} sx={{ marginTop: 2 }}>
        Add
      </Button>
    </div>
  );
};

export default MakeThisTripHappen;
