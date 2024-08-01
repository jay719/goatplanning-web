import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TripOwnerActions = ({ trip, user }) => {
  const [editableTrip, setEditableTrip] = useState({ ...trip });
  const [editMode, setEditMode] = useState(false);
  const [editableRequirements, setEditableRequirements] = useState({ ...trip.requirements });
  const [newRequirement, setNewRequirement] = useState({ category: '', description: '' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleEdit = () => setEditMode(!editMode);

  const handleSave = () => {
    setEditableTrip({ ...editableTrip, requirements: editableRequirements });
    setEditMode(false);
  };

  const handleRequirementChange = (id, key, value) => {
    setEditableRequirements(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [key]: value
      }
    }));
  };

  const handleRequirementEdit = (id) => {
    setEditableRequirements({
      ...editableRequirements,
      [id]: trip.requirements[id]
    });
  };

  const handleAddRequirement = () => {
    const newId = Object.keys(editableRequirements).length;
    setEditableRequirements({
      ...editableRequirements,
      [newId]: { category: newRequirement.category, description: newRequirement.description }
    });
    setNewRequirement({ category: '', description: '' });
  };

  const handleDeleteRequirement = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      const updatedRequirements = { ...editableRequirements };
      delete updatedRequirements[deleteId];
      setEditableRequirements(updatedRequirements);
    }
    setDeleteDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  useEffect(() => {
    console.log("trip reques", editableRequirements[0])
  
    return () => {
      
    }
  }, [])
  

  return (
    <Box sx={{ marginTop: 4 }}>
      {editMode ? (
        <>
          <TextField
            label="Title"
            value={editableTrip.title}
            onChange={(e) => setEditableTrip({ ...editableTrip, title: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={editableTrip.description}
            onChange={(e) => setEditableTrip({ ...editableTrip, description: e.target.value })}
            fullWidth
            margin="normal"
            multiline
          />
          {Object.entries(editableRequirements).map(([id, { category, description }]) => (
            <Box key={id} sx={{ marginTop: 2 }}>
              <Typography variant="h6">{`${parseInt(id) + 1}. ${category}: ${description}`}</Typography>
              <TextField
                label="Category"
                value={category}
                onChange={(e) => handleRequirementChange(id, 'category', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => handleRequirementChange(id, 'description', e.target.value)}
                fullWidth
                margin="normal"
                multiline
              />
              <IconButton
                onClick={() => handleDeleteRequirement(id)}
                sx={{ color: 'red', marginTop: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Box sx={{ marginTop: 2 }}>
            <TextField
              label="New Requirement Category"
              value={newRequirement.category}
              onChange={(e) => setNewRequirement({ ...newRequirement, category: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="New Requirement Description"
              value={newRequirement.description}
              onChange={(e) => setNewRequirement({ ...newRequirement, description: e.target.value })}
              fullWidth
              margin="normal"
              multiline
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddRequirement}
              sx={{ marginTop: 2 }}
            >
              Add Requirement
            </Button>
          </Box>
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 2 }}>
            Save
          </Button>
        </>
      ) : (
        <>
          <TextField
            label="Title"
            value={editableTrip.title}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Description"
            value={editableTrip.description}
            fullWidth
            margin="normal"
            multiline
            InputProps={{ readOnly: true }}
          />
          {Object.entries(trip.requirements).map(([id, { category, description }]) => (
            <Box key={id} sx={{ marginTop: 2 }}>
              <Typography variant="h6">{`${parseInt(id) + 1}. ${category}: ${description}`}</Typography>
            </Box>
          ))}
          <Button variant="contained" color="primary" onClick={handleEdit} sx={{ marginTop: 2 }}>
            Edit Trip
          </Button>
        </>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this requirement?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmDelete} color="secondary">Delete</Button>
          <Button onClick={handleCloseDeleteDialog} color="primary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TripOwnerActions;
