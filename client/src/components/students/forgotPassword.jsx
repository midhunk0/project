import React, { useState } from "react";
import { Box, Button, Typography, Link } from "@mui/material";
import CssTextField from "../global/CssTextField";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha"; // Import the CAPTCHA component

const ForgotPassword = () => {
    const containerStyle = {
        background: "url(../../../assets/loginBg.jpeg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    const [formData, setFormData] = useState({
        email: "",
        studentCollegeID: "",
        captcha: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSendOTP = async () => {
        // Your logic to send password reset OTP
        try {
            // Simulating API call
            const res = await fetch("http://example.com/reset-password", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            // Handle response from the server
            console.log(data);
            toast.success("Password reset OTP sent successfully!");
        } catch (error) {
            console.error("Error sending OTP:", error);
            toast.error("Error sending OTP. Please try again.");
        }
    };

    const handleCaptchaChange = (value) => {
        setFormData((prev) => ({ ...prev, captcha: value }));
    };

    return (
        <Box
            height="91.5vh"
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
                flexDirection="column"
                gap="10px"
                className="card"
            >
                <Typography variant="h5" marginTop="10px" marginBottom="30px">
                    Forgot Password
                </Typography>
                <CssTextField
                    required
                    id="email"
                    onChange={handleChange}
                    label="Enter your email"
                />
                <CssTextField
                    required
                    id="studentCollegeID"
                    onChange={handleChange}
                    label="Enter your collegeID"
                />
                {/* Add CAPTCHA component */}
                <ReCAPTCHA
                    sitekey="YOUR_RECAPTCHA_SITE_KEY"
                    onChange={handleCaptchaChange}
                />
                <Button
                    variant="contained"
                    sx={{
                        background: "#4CAF50",
                        "&:hover": { background: "#45a049" },
                    }}
                    onClick={handleSendOTP}
                >
                    Send OTP
                </Button>
                <Typography variant="body2" marginTop="10px">
                    <Link to="/login">Back to Login</Link>
                </Typography>
            </Box>
            <Toaster position="bottom-center" />
        </Box>
    );
};

export default ForgotPassword;
