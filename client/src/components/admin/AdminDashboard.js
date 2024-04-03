import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const AdminDashboard = () => {
  return (
    <Grid container spacing={3} justifyContent="center" mt="50px">
      <Grid item xs={12} sm={8} md={6}>
        <Box
          width="100%"
          padding="20px"
          border="1px solid gray"
          borderRadius="10px"
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
          bgcolor="white"
        >
            <img
            src="../../assets/admin.jpg"
            alt="admin_image"
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
          <Typography variant="h4" gutterBottom marginTop={3}>
            Dr. K. Sunil Kumar
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Training and Placement Officer
            <br />
            College of Engineering Trivandrum
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
