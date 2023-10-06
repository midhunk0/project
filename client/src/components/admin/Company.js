import React, { useEffect, useState } from "react";
import axios from "axios";
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
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const AdminRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [action, setAction] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/recruiters/getall"
        );
        setRecruiters(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecruiters();
  }, []);

  const handleReject = async (e) => {
    if (e) {
      e.preventDefault();
    }

    try {
      await Promise.all([
        axios.put(
          `http://localhost:8080/api/recruiters/recruiterRequest/${selectedRecruiter._id}`,
          {
            action: false,
          }
        )
      ])

    } catch (err) {
      console.log(err);
    }
  };


  const handleAccept = (recruiter) => {
    setSelectedRecruiter(recruiter);
    setOpenModal(true);
    setTimeout(() => {
      setOpenModal(false);
    }, 3000);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      await Promise.all([
        axios.post(
          `http://localhost:8080/api/recruiters/recruitermatch/${selectedRecruiter._id}`
        ),
        axios.put(
          `http://localhost:8080/api/recruiters/recruiterRequest/${selectedRecruiter._id}`,
          {
            action: action,
          }
        ),
      ]);

      toast.success("Matching completed successfully!");
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Matching failed:", error);
    }
  };



  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        margin: "20px",
      }}
    >
      <Box
        maxWidth="800px"
        width="100%"
        p={4}
        bgcolor="white"
        boxShadow={3}
        borderRadius={8}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Requested Recruiters List
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
                  <TableCell>
                    {recruiter.companyName}
                  </TableCell>
                  <TableCell>{recruiter.email}</TableCell>
                  <TableCell>
                    {recruiter.telephoneNo}
                  </TableCell>
                  <TableCell>{recruiter.package}</TableCell>
                  <TableCell>
                    <Box display="flex">
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginRight: "8px" }}
                        onClick={() =>
                          handleAccept(recruiter)
                        }
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleReject()}
                      >
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
            Are you sure you want to match students with{" "}
            {selectedRecruiter?.companyName}'s requirements?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminRecruiters;
