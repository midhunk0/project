import { Box } from "@mui/material";
import React from "react";

const Footer=()=>{
    return(
        <footer className="py-5" style={{ backgroundColor: '#20313e', margin:10 }}>
            <Box className="container">
                <Box className="row">
                    <Box className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                        <h5 style={{ color: 'white' }}>About</h5>
                        <p style={{ color: 'white' }}>Welcome to our Placement Management System. We help connect students and recruiters for successful placements.</p>
                    </Box>

                    <Box className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                        <h5 style={{ color: 'white' }}>Subscribe</h5>
                        <p style={{ color: 'white' }}>Stay informed about the latest job opportunities and updates.</p>
                        <form>
                            <Box className="d-flex">
                                <input type="email" className="form-control me-2" placeholder="Enter your email" />
                                <button type="submit" className="btn btn-primary" style={{marginLeft:10}}>Subscribe</button>
                            </Box>
                        </form>
                    </Box>

                    <Box className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 style={{ color: 'white' }}>Contact Us</h5>
                        <p style={{ color: 'white' }}>123 Street, City</p>
                        <p style={{ color: 'white' }}>Country</p>
                        <p style={{ color: 'white' }}>Email: info@placement.com</p>
                        <p style={{ color: 'white' }}>Phone: +1234567890</p>
                    </Box>

                    <Box className="col-lg-3 col-md-6">
                        <h5 style={{ color: 'white' }}>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/">Home</a></li>
                            <li><a href="/student/login">Student Portal</a></li>
                            <li><a href="/recruiter/login">Recruiter Portal</a></li>
                            {/* <li><a href="#">FAQs</a></li> */}
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </Box>
                </Box>
            </Box>
        </footer>
    );
};

export default Footer;
