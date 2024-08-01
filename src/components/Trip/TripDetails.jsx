import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TripOwnerActions from './help/TripOwnerActions';
import TripMemberActions from './help/TripMemberActions';
import TripMemberManagement from './help/TripMemberManagement';

const TripDetails = ({ user, trips }) => {
  const { tripId } = useParams();
  const [tripDetails, setTripDetails] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (trips && user) {
      const trip = trips.find(t => t.id === tripId);
      if (trip) {
        setTripDetails(trip);
        setIsOwner(trip.ownerIds && trip.ownerIds.includes(user.id));
      }
    }
  }, [tripId, trips, user]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (!tripDetails) return <Typography>Trip not found</Typography>;

  return (
    <Container maxWidth="sm" sx={{ marginTop: 8, padding: 2, marginBottom: 10 }}>
      {/* Public Trip Details */}
      <Typography variant="h4" component="h1" gutterBottom>
        {tripDetails.title}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {tripDetails.description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Destination: {tripDetails.destination}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Requirements:
      </Typography>
      <ul>
        {Object.entries(tripDetails.requirements).map(([id, { category, description }]) => (
          <li key={id}>
            <Typography variant="body2">
              <strong>{category}:</strong> {description}
            </Typography>
          </li>
        ))}
      </ul>

      {/* Owner Actions */}
      {isOwner && (
        <Accordion sx={{ marginTop: 4 }} expanded={expanded === 'owner-actions'} onChange={handleChange('owner-actions')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="owner-actions-content"
            id="owner-actions-header"
          >
            <Typography>Owner Actions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TripOwnerActions trip={tripDetails} user={user} />
          </AccordionDetails>
        </Accordion>
      )}

      {/* Member Management */}
      <Accordion sx={{ marginTop: 4 }} expanded={expanded === 'member-management'} onChange={handleChange('member-management')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="member-management-content"
          id="member-management-header"
        >
          <Typography>Member Management</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TripMemberManagement trip={tripDetails} user={user} />
        </AccordionDetails>
      </Accordion>

      {/* Member Actions */}
      <Accordion sx={{ marginTop: 4,  }} expanded={expanded === 'member-actions'} onChange={handleChange('member-actions')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="member-actions-content"
          id="member-actions-header"
        >
          <Typography>Member Actions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TripMemberActions trip={tripDetails} user={user} />
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default TripDetails;
