import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const WhyRecruit = () => {
  return (
    <section id="why-recruit" style={sectionStyle}>
      <Container>
        <h2 style={headingStyle} className="text-center mb-4">
          Why College of Engineering Trivandrum?
        </h2>
        <hr></hr>
        <br></br>
        <Row>
          <Col md={6} style={columnStyle} className="mb-4">
            <div style={itemStyle}>
              <h4 style={titleStyle}>Quality Education and Excellence</h4>
              <p style={descriptionStyle}>
                College of Engineering Trivandrum (CET) is renowned for its commitment to providing top-notch engineering education. Our rigorous academic programs are designed to foster critical thinking, problem-solving skills, and creativity among our students.
              </p>
            </div>
          </Col>
          <Col md={6} style={columnStyle} className="mb-4">
            <div style={itemStyle}>
              <h4 style={titleStyle}>Talented and Diverse Student Pool</h4>
              <p style={descriptionStyle}>
                Our diverse student body brings together some of the brightest minds from across the country. CET students are known for their dedication, technical expertise, and innovative mindset, making them valuable assets to any organization.
              </p>
            </div>
          </Col>
          <Col md={6} style={columnStyle} className="mb-4">
            <div style={itemStyle}>
              <h4 style={titleStyle}>Industry-Focused Curriculum</h4>
              <p style={descriptionStyle}>
              Our curriculum is designed in close collaboration with industry experts to ensure that our graduates are well-prepared to meet the demands of the modern workforce. Our students acquire practical skills and knowledge that are directly applicable to real-world challenges.
              </p>
            </div>
          </Col>
          <Col md={6} style={columnStyle} className="mb-4">
            <div style={itemStyle}>
              <h4 style={titleStyle}>State-of-the-Art Facilities</h4>
              <p style={descriptionStyle}>
              CET boasts state-of-the-art labs, research facilities, and technology resources that empower students to explore and innovate. Our modern campus environment facilitates hands-on learning, research, and development in various engineering disciplines.
              </p>
            </div>
          </Col>
          <Col md={6} style={columnStyle} className="mb-4">
            <div style={itemStyle}>
              <h4 style={titleStyle}>Talented and Diverse Student Pool</h4>
              <p style={descriptionStyle}>
                Our diverse student body brings together some of the brightest minds from across the country. CET students are known for their dedication, technical expertise, and innovative mindset, making them valuable assets to any organization.
              </p>
            </div>
          </Col>
          <Col md={6} style={columnStyle} className="mb-4">
            <div style={itemStyle}>
              <h4 style={titleStyle}>Strong Alumni Network</h4>
              <p style={descriptionStyle}>
              Our extensive alumni network consists of successful professionals who have made significant contributions to various industries. Many of our alumni hold leadership positions in renowned companies and organizations, providing a strong support system for our graduates.
              </p>
            </div>
          </Col>
          {/* Add more columns for other features */}
        </Row>
      </Container>
    </section>
  );
};

export default WhyRecruit;

// Inline styles
const sectionStyle = {
  backgroundColor: '#f8f9fa',
  padding: '80px 0',
};

const headingStyle = {
  fontSize: '36px',
  color: '#20313e',
  fontWeight: 'bold',
};

const columnStyle = {
  marginBottom: '20px',
};

const itemStyle = {
  backgroundColor: '#ffffff',
  padding: '30px',
  borderRadius: '8px',
  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
};

const titleStyle = {
  fontSize: '24px',
  color: '#20313e',
  marginBottom: '20px',
};

const descriptionStyle = {
  fontSize: '16px',
  color: '#6c757d',
};
