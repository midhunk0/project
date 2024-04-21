import React from "react";
import { Box } from "@mui/material";
import Card from "react-bootstrap/Card";
import { Container, Image } from "react-bootstrap";
import "./contact.css"
import { display } from "@mui/system";

const Contact = () => {


    return (
        <Box margin="10px" width="auto">
            <Box>
                <img
                    src={`../../../assets/contactpage.jpg`}
                    alt="contact"
                    style={{
                        background: "cover",
                        width: "100%",
                        height: "100%",
                    }}
                />
            </Box>
            <Box
                position="absolute"
                top="30%"
                left="50%"
                textAlign="center"
                color="white"
                sx={{ transform: "translate(-50%,-50%)" }}
            >
                <h1 className="text-center">CONTACT US</h1>
                <p>Home/Contact</p>
            </Box>
            <Box>
                <Box textAlign="center" marginTop="80px">
                    <h1>GET IN TOUCH</h1>
                </Box>
                <hr
                    style={{
                        borderTop: "1px solid #000",
                        margin: "60px auto",
                        width: "50%",
                    }}
                />
            </Box>

            <Box>
                <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.5435155344594!2d76.90342787472107!3d8.543618141499643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05beb808396e3f%3A0xbdb296f9c4101374!2sCGPU!5e0!3m2!1sen!2sin!4v1685858611286!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: "0" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </Box>

            <br />
            <br />
            <div style={{display:"flex"}}>
            <Card className="address-card" >
                <Card.Body>
                    <Card.Title>Address</Card.Title>
                    <Card.Text>
                        Dr. K. Sunil Kumar<br />
                        Training and Placement Officer<br />
                        Career Guidance and Placement Unit (CGPU),<br />
                        College of Engineering Trivandrum,<br />
                        Engineering College P.O., Sreekaryam,<br />
                        Thiruvananthapuram, Kerala 695016
                    </Card.Text>
                </Card.Body>
            </Card>

            {/* Contact Person Card */}
            <Card className="contact-person-card">
                <Card.Body>
                    <Card.Title>Contact Person</Card.Title>
                    <Card.Text>
                        Mobile: 919946844277<br />
                        Phone: 0471-2515682<br />
                        Phone: +91 99468 44277<br />
                        Email: placement@cet.ac.in
                    </Card.Text>
                </Card.Body>
            </Card>
            </div>
            

            <Box className="bottomContainer">
                <Box className="top-text">
                    <h1 style={{ marginTop: "80px", textAlign: "center" }}>
                        FEEL FREE TO REACH US!
                    </h1>
                </Box>
                <Box className="bottom-text-divider"></Box>
            </Box>
        </Box>
    );
};

export default Contact;
