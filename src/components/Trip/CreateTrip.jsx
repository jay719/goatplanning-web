import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTripContext } from '../../contexts/TripContext';
import { Trip } from '../../classes/TripClass';

const CreateTrip = () => {
  const { user, trips, setTrips } = useTripContext();
  const [step, setStep] = useState(1);
  const [tripTitle, setTripTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState('');
  const [requirements, setRequirements] = useState([]);
  const [newRequirement, setNewRequirement] = useState({ category: '', description: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    setStep(2);
  };

  const handleAddMember = () => {
    if (newMember && !members.includes(newMember)) {
      setMembers([...members, newMember]);
      setNewMember('');
    }
  };

  const handleRemoveMember = (member) => {
    setMembers(members.filter(m => m !== member));
  };

  const handleAddRequirement = () => {
    if (newRequirement.category && newRequirement.description) {
      setRequirements([...requirements, newRequirement]);
      setNewRequirement({ category: '', description: '' });
    }
  };

  const handleRemoveRequirement = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const finalizeTrip = () => {
    if (!tripTitle || !startDate) {
      setError('Title and Start Date are required');
      return;
    }

    // Convert dates to YYYY-MM-DD format
    const formattedStartDate = startDate ? startDate.format('YYYY-MM-DD') : null;
    const formattedEndDate = endDate ? endDate.format('YYYY-MM-DD') : null;

    const newTrip = new Trip(
      [user.id],
      members,
      tripTitle,
      description,
      destination,
      requirements.reduce((acc, req, idx) => {
        acc[idx] = req;
        return acc;
      }, {}),
      new Date(formattedStartDate),
      formattedEndDate ? new Date(formattedEndDate) : null,
      'Active'
    );

    setTrips([...trips, newTrip]);
    navigate(`/trip/${newTrip.id}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="sm" sx={{ marginTop: 8 }}>
        {step === 1 && (
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Create a Trip
            </Typography>
            <form>
              <TextField
                label="Trip Title*"
                fullWidth
                margin="normal"
                value={tripTitle}
                onChange={(e) => setTripTitle(e.target.value)}
              />
              <TextField
                label="Destination Address"
                fullWidth
                margin="normal"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <TextField
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <DatePicker
                label="Start Date*"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
              {error && <Typography color="error">{error}</Typography>}
              <Button variant="contained" color="primary" onClick={handleContinue} sx={{ marginTop: 2 }}>
                Continue
              </Button>
            </form>
          </Box>
        )}

        {step === 2 && (
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Add Members and Requirements
            </Typography>
            <Box>
              <Typography variant="h6" gutterBottom>
                Add Members
              </Typography>
              <TextField
                label="New Member"
                fullWidth
                margin="normal"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
              />
              <Button variant="contained" color="secondary" onClick={handleAddMember} sx={{ marginTop: 2 }}>
                Add Member
              </Button>
              <List sx={{ marginTop: 2 }}>
                {members.map((member, index) => (
                  <ListItem key={index} sx={{ justifyContent: 'space-between' }}>
                    <ListItemText primary={member} />
                    <IconButton onClick={() => handleRemoveMember(member)} sx={{ color: 'red' }}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h6" gutterBottom>
                Add Requirements
              </Typography>
              <TextField
                label="Requirement Category"
                fullWidth
                margin="normal"
                value={newRequirement.category}
                onChange={(e) => setNewRequirement({ ...newRequirement, category: e.target.value })}
              />
              <TextField
                label="Requirement Description"
                fullWidth
                margin="normal"
                multiline
                rows={2}
                value={newRequirement.description}
                onChange={(e) => setNewRequirement({ ...newRequirement, description: e.target.value })}
              />
              <Button variant="contained" color="secondary" onClick={handleAddRequirement} sx={{ marginTop: 2 }}>
                Add Requirement
              </Button>
              <List sx={{ marginTop: 2 }}>
                {requirements.map((requirement, index) => (
                  <ListItem key={index} sx={{ justifyContent: 'space-between' }}>
                    <ListItemText primary={`${requirement.category}: ${requirement.description}`} />
                    <IconButton onClick={() => handleRemoveRequirement(index)} sx={{ color: 'red' }}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Button variant="contained" color="primary" onClick={() => setStep(1)} sx={{ marginTop: 2 }}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={finalizeTrip} sx={{ marginTop: 2, marginLeft: 2 }}>
              Finish
            </Button>
          </Box>
        )}
      </Container>
    </LocalizationProvider>
  );
};

export default CreateTrip;
