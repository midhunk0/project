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
} from '@mui/material';

const AdminRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);

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

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box maxWidth="800px" width="100%">
        <Typography variant="h4" align="center" mb={3}>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {recruiters.map((recruiter) => (
                <TableRow key={recruiter._id}>
                  <TableCell>{recruiter.companyName}</TableCell>
                  <TableCell>{recruiter.email}</TableCell>
                  <TableCell>{recruiter.telephoneNo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminRecruiters;
