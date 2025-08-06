// src/components/ApplicantDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Chip,
  Paper, 
  Button,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { getApplicant } from '../utils/api';

const ApplicantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        setLoading(true);
        const response = await getApplicant(id);
        
        setApplicant(response.data.data);
      } catch (err) {
        console.log('Error fetching applicant details:', err);
        setError('Failed to fetch applicant details');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicant();
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
  }

  if (!applicant) {
    return <Alert severity="info" sx={{ m: 2 }}>Applicant not found</Alert>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button 
        startIcon={<BackIcon />} 
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back to Dashboard
      </Button>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
          {applicant.name}
        </Typography>
        
        <List>
          <ListItem>
            <ListItemText 
              primary="Email" 
              secondary={applicant.email || 'N/A'} 
            />
          </ListItem>
          <Divider />
          
          <ListItem>
            <ListItemText 
              primary="Phone" 
              secondary={applicant.phone || 'N/A'} 
            />
          </ListItem>
          <Divider />
          
          <ListItem>
            <ListItemText 
              primary="Position Applied" 
              secondary={applicant.appliedPosition || 'N/A'} 
            />
          </ListItem>
          <Divider />
          
          <ListItem>
            <ListItemText 
              primary="Application Date" 
              secondary={formatDate(applicant.appliedAt)} 
            />
          </ListItem>
          <Divider />
          
          <ListItem>
            <ListItemText 
              primary="Experience" 
              secondary={applicant.experience || 'N/A'} 
            />
          </ListItem>
          <Divider />
          
          <ListItem>
            <ListItemText 
              primary="Availability" 
              secondary={applicant.availability || 'N/A'} 
            />
          </ListItem>
          <Divider />
          
          <ListItem>
            <ListItemText 
              primary="Education" 
              secondary={applicant.education || 'N/A'} 
            />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText 
              primary="Occupation" 
              secondary={applicant.occupation || 'N/A'} 
            />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText 
              primary="Address" 
              secondary={applicant.address || 'N/A'} 
            />
          </ListItem>
          <Divider /> 

          <ListItem sx={{ alignItems: 'flex-start' }}>
            <ListItemText 
              primary="Skills" 
              secondary={
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {applicant.skills.map((skill, index) => (
                    <Chip key={index} label={skill} size="small" />
                  ))}
                </Box>
              } 
            />
          </ListItem>
          <Divider />
        </List>
      </Paper>
    </Container>
  );
};

export default ApplicantDetail;