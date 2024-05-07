import React, { useContext, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CssTextField from "../global/CssTextField";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import { baseUrl } from "../../Url";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const id = user._id;
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://${baseUrl}/api/students/updatePassword/` + id,
        formData
      );
      toast.success(res.data.message);
      // Update isPasswordChanged field
      await axios.put(
        `http://${baseUrl}/api/students/updateIsPasswordChanged/` + id,
        { isPasswordChanged: true }
      );
      navigate("/student/home");
    } catch (err) {
      console.log(err.response);
      toast.error("Failed to update password!");
    }
  };

  return (
    <Box
      height="91.5vh"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bgcolor="white"
        padding="20px 60px"
        borderRadius="10px"
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap="10px"
        className="card"
      >
        <Typography variant="h5" marginTop="10px" marginBottom="30px">
          Update Password
        </Typography>
        <CssTextField
          name="oldPassword"
          required
          label="Old Password"
          type="password"
          value={formData.oldPassword}
          onChange={handleChange}
          fullWidth
        />
        <CssTextField
          name="newPassword"
          required
          label="New Password"
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
          fullWidth
        />
        <CssTextField
          name="confirmPassword"
          required
          label="Confirm New Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Update Password
        </Button>
      </Box>
      <Toaster position="bottom-center" />
    </Box>
  );
};

export default UpdatePassword;
