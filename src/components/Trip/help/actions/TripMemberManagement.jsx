import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TripMemberManagement = ({ trip, user, onUpdateTrip }) => {
  const [newMember, setNewMember] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState('');

  const handleAddMember = () => {
    if (newMember && !trip.memberIds.includes(newMember)) {
      onUpdateTrip({ ...trip, memberIds: [...trip.memberIds, newMember] });
      setNewMember('');
    }
  };

  const handleRemoveMember = (member) => {
    setMemberToRemove(member);
    setDeleteDialogOpen(true);
  };

  const confirmRemoveMember = () => {
    onUpdateTrip({ ...trip, memberIds: trip.memberIds.filter(id => id !== memberToRemove) });
    setDeleteDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setMemberToRemove('');
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        Manage Members
      </Typography>
      <TextField
        label="Add New Member"
        value={newMember}
        onChange={(e) => setNewMember(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleAddMember}
        sx={{ marginTop: 2 }}
      >
        Add Member
      </Button>
      <List sx={{ marginTop: 2 }}>
        {trip.memberIds.map(member => (
          <ListItem key={member} sx={{ justifyContent: 'space-between' }}>
            <ListItemText primary={member} />
            {user.id === trip.ownerIds[0] && (
              <IconButton onClick={() => handleRemoveMember(member)} sx={{ color: 'red' }}>
                <DeleteIcon />
              </IconButton>
            )}
          </ListItem>
        ))}
      </List>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to remove this member?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmRemoveMember} color="primary">Confirm</Button>
          <Button onClick={handleCloseDeleteDialog} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TripMemberManagement;
