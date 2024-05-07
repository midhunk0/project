import React, { useContext } from "react";
import { useState } from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { baseUrl } from "../../Url";


const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center", // Align center vertically
  width: "100%", // Occupy full width of parent container
  padding: theme.spacing(2),
  perspective: "1000px", // Add perspective for 3D effect
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
  boxShadow: `${theme.spacing(1)} ${theme.spacing(1)} ${theme.spacing(3)} rgba(0, 0, 0, 0.1)`, // Add a 3D shadow effect
  transform: "rotateX(2deg)", // Rotate the component slightly on the X-axis for a 3D effect
  transition: "transform 0.3s ease-in-out", // Add transition for smooth animation
  "&:hover": {
    transform: "rotateX(0deg)", // Reset rotation on hover
  },
}));

const Request = () => {
  const [action, setAction] = useState(false);
  const { user } = useContext(AuthContext);
  const id = user._id;

  const handleRequest = async (e) => {
    setAction(true);
    console.log(action)
    e.preventDefault();
    try {
      await axios.put(`http://${baseUrl}/api/recruiters/recruiterRequest/${id}`, {
        action: action,
      });
      toast.success("Request sent successfully")
    } catch (err) {
      console.log(err);
    }
  };

  const colors = tokens();

  return (
    <StyledBox>
      <ContentBox style={{display:"flex",flexDirection:"column"}}>
        <Typography variant="h5" marginRight={2}>
        Are you ready to submit your request to the administrator?
        </Typography>
        <Button
        style={{top:"120px"}}
          onClick={handleRequest}
          variant="contained"
          sx={{
            backgroundColor: colors.primary,
            color: colors.white,
            "&:hover": {
              backgroundColor: colors.primaryDark,
            },
          }}
        >
          Request
        </Button>
      </ContentBox>
      <Toaster position="bottom-center" />
    </StyledBox>
  );
};

export default Request;
