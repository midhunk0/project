import { Box } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-5" style={{ backgroundColor: "#20313e", margin: 10 }}>
      <Box className="container">
        <Box className="row">
          <Box className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 style={{ color: "white" }}>About</h5>
            <p style={{ color: "white" }}>
              Welcome to our Placement Management System. Streamlining the
              placement process
            </p>
          </Box>

          {/* <Box className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 style={{ color: "white" }}>Subscribe</h5>
            <p style={{ color: "white" }}>
              Stay informed about the latest job opportunities and updates.
            </p>
            <form>
              <Box className="d-flex">
                <input
                  type="email"
                  className="form-control me-2"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ marginLeft: 10 }}
                >
                  Subscribe
                </button>
              </Box>
            </form>
          </Box> */}

          <Box className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 style={{ color: "white" }}>Contact Us</h5>
            <p style={{ color: "white" }}>Career Guidance and Placement Unit(CGPU)</p>
            <p style={{ color: "white" }}>College of Engineering,</p>
            <p style={{ color: "white" }}>Thiruvananthapuram - 695016</p>
            <p style={{ color: "white" }}>Kerala,South India</p>
            <p style={{ color: "white" }}>Email: placement@cet.ac.in</p>
            <p style={{ color: "white" }}>Phone: 0471 -2595152</p>
          </Box>

          <Box className="col-lg-3 col-md-6">
            <h5 style={{ color: "white" }}>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/student/login">Student Portal</a>
              </li>
              <li>
                <a href="/recruiter/login">Recruiter Portal</a>
              </li>
              {/* <li><a href="#">FAQs</a></li> */}
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
