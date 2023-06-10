import React from "react";

const Footer = () => {
  return (
    <footer className="py-5" style={{ backgroundColor: '#20313e' }}>
  <div className="container">
    <div className="row">
      <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
        <h5 style={{ color: 'white' }}>About</h5>
        <p style={{ color: 'white' }}>Welcome to our Placement Management System. We help connect students and recruiters for successful placements.</p>
      </div>

      <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
        <h5 style={{ color: 'white' }}>Subscribe</h5>
        <p style={{ color: 'white' }}>Stay informed about the latest job opportunities and updates.</p>
        <form>
          <div className="d-flex">
            <input type="email" className="form-control me-2" placeholder="Enter your email" />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </div>
        </form>
      </div>

      <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 style={{ color: 'white' }}>Contact Us</h5>
        <p style={{ color: 'white' }}>123 Street, City</p>
        <p style={{ color: 'white' }}>Country</p>
        <p style={{ color: 'white' }}>Email: info@placement.com</p>
        <p style={{ color: 'white' }}>Phone: +1234567890</p>
      </div>

      <div className="col-lg-3 col-md-6">
        <h5 style={{ color: 'white' }}>Quick Links</h5>
        <ul className="list-unstyled">
          <li><a href="#">Home</a></li>
          <li><a href="#">Student Portal</a></li>
          <li><a href="#">Recruiter Portal</a></li>
          <li><a href="#">FAQs</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>

  );
};

export default Footer;
