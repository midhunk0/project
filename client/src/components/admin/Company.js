import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const AdminRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/recruiters/getall');
        setRecruiters(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecruiters();
  }, []);

  const handleAccept = (recruiter) => {
    setSelectedRecruiter(recruiter);
    setOpenModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.post(`http://localhost:8080/api/recruiters/recruitermatch/${selectedRecruiter._id}`);
      console.log('Matching completed successfully!');
      setOpenModal(false);
      // You can add any further actions or state updates here
    } catch (error) {
      console.error('Matching failed:', error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box maxWidth="800px" width="100%" p={4} bgcolor="white" boxShadow={3} borderRadius={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Recruiters List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Package</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recruiters.map((recruiter) => (
                <TableRow key={recruiter._id}>
                  <TableCell>{recruiter.companyName}</TableCell>
                  <TableCell>{recruiter.email}</TableCell>
                  <TableCell>{recruiter.telephoneNo}</TableCell>
                  <TableCell>{recruiter.package}</TableCell>
                  <TableCell>
                    <Box display="flex">
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginRight: '8px' }}
                        onClick={() => handleAccept(recruiter)}
                      >
                        Accept
                      </Button>
                      <Button variant="contained" color="error">
                        Reject
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Confirm Match</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to match requirements for "{selectedRecruiter?.companyName}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminRecruiters;
