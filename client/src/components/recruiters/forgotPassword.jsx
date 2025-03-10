import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CssTextField from "../global/CssTextField";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha"; // Import the CAPTCHA component
import { AuthContext } from "../../contexts/AuthContext";

const StudentForgotPassword = () => {
  const [verified, setVerified] = useState(false);
  const [otp, setOtp] = useState(null);
  const [correctOTP, setCorrectOTP] = useState(null);
  const [otpSent, setOtpSent] = useState(false); // Track if OTP has been sent
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const containerStyle = {
    background: "url(../../../assets/loginBg.jpeg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const [formData, setFormData] = useState({
    email: "",
    otp: "", // New state for OTP input
    captcha: "",
    newPassword: "", // New state for new password input
    confirmPassword: "", // New state for confirm password input
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSendOTP = async () => {
    // Your logic to send password reset OTP
    try {
      // Simulating API call
      const res = await fetch(
        "https://project-api-iwiy.onrender.com/api/recruiters/forgotPassword",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      // Handle response from the server

      setCorrectOTP(data.data);
      toast.success("Password reset OTP sent successfully!");
      setOtpSent(true); // Set otpSent to true when OTP is sent
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Error sending OTP. Please try again.");
    }
  };

  const handleVerifyOTP = async () => {
    // Your logic to verify OTP
    try {
      // Simulating API call

      const f = {
        otp: otp,
        correct_otp: correctOTP,
      };

      const res = await fetch(
        "https://project-api-iwiy.onrender.com/api/recruiters/verifyOTP",
        {
          method: "POST",
          body: JSON.stringify(f), // Send the OTP for verification
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      // Handle response from the server

      toast.success("OTP verified successfully!");
      setShowNewPassword(true);
      // Redirect or perform desired action upon successful verification
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Error verifying OTP. Please try again.");
    }
  };

  const handleCaptchaChange = (value) => {
    setFormData((prev) => ({ ...prev, captcha: value }));
    setVerified(true);
  };

  const handleUpdatePassword = async () => {
    const { newPassword, confirmPassword } = formData;

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      // Simulating API call to update password

      const res = await fetch(
        "https://project-api-iwiy.onrender.com/api/recruiters/updateForgotPassword",
        {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      toast.success("Password updated successfully!");
      navigate("/recruiter/login");
      // Redirect or perform desired action upon successful password update
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Error updating password. Please try again.");
    }
  };

  return (
    <Box
      height="95.5vh"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={containerStyle}
    >
      <Box
        bgcolor="white"
        padding="20px 60px"
        borderRadius="10px"
        display="flex"
        alignItems="center"
        maxWidth="400px" // Limit maximum width for better responsiveness
        flexDirection="column"
        gap="10px"
        className="card"
      >
        <Typography variant="h5" marginTop="10px" marginBottom="30px">
          Forgot Password
        </Typography>
        {
          <>
            <CssTextField
              required
              id="email"
              onChange={handleChange}
              label="Enter your email"
            />

            {/* Add CAPTCHA component */}
            <ReCAPTCHA
              sitekey="6LfpbdUpAAAAAGIjg8MRnBSM-TP1ETBCPipPxGQr"
              onChange={handleCaptchaChange}
            />
            {/* Send OTP button */}
            <Button
              variant="contained"
              sx={{
                background: "#4CAF50",
                "&:hover": { background: "#45a049" },
              }}
              onClick={handleSendOTP}
              disabled={!verified}
            >
              Send OTP
            </Button>
            {otpSent &&
              !showNewPassword && ( // Render OTP input and Verify button when OTP is sent
                <>
                  <CssTextField
                    required
                    id="otp"
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
                    label="Enter OTP"
                  />
                  {/* Verify OTP button */}
                  <Button
                    variant="contained"
                    sx={{
                      background: "#2196F3",
                      "&:hover": {
                        background: "#1976D2",
                      },
                    }}
                    onClick={handleVerifyOTP}
                  >
                    Verify
                  </Button>
                </>
              )}

            {showNewPassword && (
              <>
                <CssTextField
                  required
                  id="newPassword"
                  onChange={handleChange}
                  label="Enter new password"
                />
                <CssTextField
                  required
                  id="confirmPassword"
                  onChange={handleChange}
                  label="Confirm password"
                />
                {/* Update password button */}
                <Button
                  variant="contained"
                  sx={{
                    background: "#FF5722",
                    "&:hover": { background: "#E64A19" },
                  }}
                  onClick={handleUpdatePassword}
                >
                  Update Password
                </Button>
              </>
            )}
          </>
        }
        <Typography variant="body2" marginTop="10px">
          <Link to="/recruiter/login">Back to Login</Link>
        </Typography>
      </Box>
      <Toaster position="bottom-center" />
    </Box>
  );
};

export default StudentForgotPassword;
