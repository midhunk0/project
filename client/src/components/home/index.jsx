import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./index.css";

const Home = () => {
  const colors = tokens();
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box margin="10px" width="auto">
      <Box>
        <Box
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
          </ol>
          <Box className="carousel-inner">
            <Box className="carousel-item active">
              <img
                className="d-block w-100"
                src={`../../../assets/cet_front.jpg`}
                style={{
                  background: "cover",
                  width: "100%",
                  maxHeight: "650px",
                }}
                alt="First slide"
              />
            </Box>
            <Box className="carousel-item">
              <img
                className="d-block w-100"
                src={`../../../assets/cet_gate.jpg`}
                style={{
                  background: "cover",
                  width: "100%",
                  maxHeight: "650px",
                }}
                alt="Second slide"
              />
            </Box>
            <Box className="carousel-item">
              <img
                className="d-block w-100"
                src={`../../../assets/cet_sideview.jpg`}
                style={{
                  background: "cover",
                  width: "100%",
                  maxHeight: "650px",
                }}
                alt="Third slide"
              />
            </Box>
            <Box className="carousel-item">
              <img
                className="d-block w-100"
                src={`../../../assets/cet_plaque.jpg`}
                style={{
                  background: "cover",
                  width: "100%",
                  maxHeight: "650px",
                }}
                alt="Fourth slide"
              />
            </Box>
          </Box>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </Box>
      </Box>

      <Container fluid>
        <div className="section1">
          {isMobile ? (
            <Typography>
              <h4 className="main-heading" style={{ fontSize: "48px" }}>
                Overview of Our Institution
              </h4>
            </Typography>
          ) : (
            <Typography>
              <h2 className="main-heading" style={{ fontSize: "78px" }}>
                Overview of Our Institution
              </h2>
            </Typography>
          )}
          <hr
            style={{
              border: "1px groove",
              width: isMobile ? "50%" : "25%",
            }}
          />
          <br />
          <Card
            className="overview-card mx-auto "
            style={{ maxWidth: "70rem" }}
          >
            <Card.Body>
              <Card.Text>
                The College of Engineering, Trivandrum was established in 1939
                as the first Engineering College in the then Travancore State.
                The first classes were started on 3rd July 1939 during the reign
                of the Travancore King, Sri Chithira Thirunal Balarama Varma,
                and as the head of the then Travancore state, he deserves his
                share of credit in the establishment of the college. Initially,
                the College was housed in the former office and bungalow of the
                Chief Engineer (present PMG Office). Maj T.H. Mathewman, a
                Britisher, was the first Principal. Started as a constituent
                College of Travancore University, the College had an initial
                intake of 21 students each for Degree and Diploma courses in
                Civil, Mechanical, and Electrical branches. With the
                establishment of the Directorate of Technical Education in the
                late fifties, the College administration came under the control
                of the Government of Kerala. The College was shifted to the
                present sprawling 125 acres in 1960.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="section">
          {isMobile ? (
            <Typography>
              <h4 className="main-heading" style={{ fontSize: "48px" }}>
                Welcome to CGPU
              </h4>
            </Typography>
          ) : (
            <Typography>
              <h2 className="main-heading" style={{ fontSize: "78px" }}>
                Welcome to CGPU
              </h2>
            </Typography>
          )}
          <hr
            style={{
              border: "1px groove",
              width: isMobile ? "50%" : "25%",
            }}
          />
          <br />

          <Card className="overview-card mx-auto" style={{ maxWidth: "70rem" }}>
            <Card.Body>
              <Card.Text>
                The Career Guidance and Placement Unit (CGPU) was started in
                this college as a voluntary organization in January 1984. The
                Placement Officer who is assisted by student representatives
                from all the departments heads this unit. The Principal of the
                institution and all other faculty members have extended their
                wholehearted support to the functioning of the unit. The unit is
                purely dedicated to assist the students to get placements in
                leading companies. The unit takes immense effort to invite
                companies for campus recruitment and to make the best
                arrangements for the campus interviews. It is our pleasure to
                acknowledge that the career of a few thousands of graduates of
                this institution has been started in the campus interview.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="section">
          {isMobile ? (
            <Typography>
              <h4 className="main-heading" style={{ fontSize: "48px" }}>
                Statistics
              </h4>
            </Typography>
          ) : (
            <Typography>
              <h2 className="main-heading" style={{ fontSize: "78px" }}>
                Statistics
              </h2>
            </Typography>
          )}
          <hr
            style={{
              border: "1px groove",
              width: isMobile ? "50%" : "25%",
            }}
          />
          <br />
          <section>
            <div class="container">
              <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12">
                  <div class="card1">
                    <div class="cover item-a">
                      <h1 className="year_heading">2022</h1>

                      <div class="card-back">
                        <a href="http://placement.cet.ac.in/Placement202122.pdf">
                          Click me!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                  <div class="card1">
                    <div class="cover item-b">
                      <h1 className="year_heading">2021</h1>
                      <div class="card-back">
                        <a href="http://placement.cet.ac.in/Placement202021.pdf">
                          Click me!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                  <div class="card1">
                    <div class="cover item-c">
                      <h1 className="year_heading">2020</h1>
                      <div class="card-back">
                        <a href="http://placement.cet.ac.in/Placement201920.pdf">
                          click me!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="container">
              <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12">
                  <div class="card1">
                    <div class="cover item-a">
                      <h1 className="year_heading">2019</h1>

                      <div class="card-back">
                        <a href="http://placement.cet.ac.in/Placement201819.pdf">
                          Click me!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                  <div class="card1">
                    <div class="cover item-b">
                      <h1 className="year_heading">2018</h1>
                      <div class="card-back">
                        <a href="#">Click me!</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                  <div class="card1">
                    <div class="cover item-c">
                      <h1 className="year_heading">2017</h1>
                      <div class="card-back">
                        <a href="#">click me!</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="section">
          {isMobile ? (
            <Typography>
              <h4 className="main-heading" style={{ fontSize: "48px" }}>
                Recruiter's Speak
              </h4>
            </Typography>
          ) : (
            <Typography>
              <h2 className="main-heading" style={{ fontSize: "78px" }}>
                Recruiter's Speak
              </h2>
            </Typography>
          )}
          <hr
            style={{
              border: "1px groove",
              width: isMobile ? "50%" : "25%",
            }}
          />
          <br />

          <div>
          <div className="carousel-container carousel-container-2 col-md-10 ">
            <div
              id="carouselTestimonial"
              className="carousel carousel-testimonial slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselTestimonial"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li data-target="#carouselTestimonial" data-slide-to="1"></li>
                <li data-target="#carouselTestimonial" data-slide-to="2"></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item text-center active">
                  <div className="carousel-testimonial-img p-1 border  m-auto">
                    <img
                      className="d-block w-100 rounded-circle"
                      src="../../../assets/Cognizant-Logo.png"
                      alt="First slide"
                    />
                  </div>
                  <h5 className="mt-4 mb-0">
                    <p2>
                      " Cognizant shares a fantastic relationship with CET. We
                      have been visiting the institute for the past several
                      years and every year the students seem to be getting
                      better - a tribute to the grooming and development of the
                      students, to the faculty and the management team of the
                      college. The students whom we have hired from the college
                      in the past are today in leading positions within
                      Cognizant, working across different technology platforms
                      and domains. "
                    </p2>
                  </h5>
                </div>
                <div className="carousel-item text-center">
                  <div className="carousel-testimonial-img p-1 border m-auto">
                    <img
                      className="d-block w-100 "
                      src="../../../assets/Microsoft-logo.jpg"
                      alt="Second slide"
                    />
                  </div>
                  <h5 className="mt-4 mb-0">
                    <p2>
                      " We are very happy with the way the students have fared
                      in the selection processes and in their general behavior
                      and attitude. Thanks to the hospitality extended to us by
                      your team. "
                    </p2>
                  </h5>
                </div>
                <div className="carousel-item text-center">
                  <div className="carousel-testimonial-img p-1 border m-auto">
                    <img
                      className="d-block w-100 "
                      src="./../../assets/symphony-logo.png"
                      alt="Third slide"
                    />
                  </div>
                  <h5 className="mt-4 mb-0">
                    <p2>
                      " Thank you for the overall arrangement made for the
                      campus placements. The quality of the students is very
                      good, and we would definitely consider visiting again next
                      year. "
                    </p2>
                  </h5>
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselTestimonial"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselTestimonial"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
        </div>
      </Container>

      <div className="section">
        {isMobile ? (
          <Typography>
            <h4 className="main-heading" style={{ fontSize: "48px" }}>
              Our Recruiters
            </h4>
          </Typography>
        ) : (
          <Typography>
            <h2 className="main-heading" style={{ fontSize: "78px" }}>
              Our Recruiters
            </h2>
          </Typography>
        )}
        <hr
          style={{
            border: "1px groove",
            width: isMobile ? "50%" : "25%",
          }}
        />
        <br />
        <div className="recruiters-container">
          <div className="recruiter-logo">
            <img src="../../../assets/Accenture-logo.png" alt="Recruiter 1" />
          </div>
          <div className="recruiter-logo">
            <img src="../../../assets/Amazon-Logo.png" alt="Recruiter 2" />
          </div>
          <div className="recruiter-logo">
            <img
              src="../../../assets/Ashok-Leyland-logo.png"
              alt="Recruiter 3"
            />
          </div>
          <div className="recruiter-logo">
            <img src="../../../assets/Cisco-logo.png" alt="Recruiter 4" />
          </div>
          <div className="recruiter-logo">
            <img src="../../../assets/Cognizant-Logo.png" alt="Recruiter 5" />
          </div>
          <div className="recruiter-logo">
            <img src="../../../assets/Deloitte-logo.png" alt="Recruiter 6" />
          </div>
          <div className="recruiter-logo">
            <img src="../../../assets/Google-Logo.png" alt="Recruiter 7" />
          </div>

          <div className="recruiter-logo">
            <img src="../../../assets/Infosys_logo.svg.png" alt="Recruiter 9" />
          </div>
          <div className="recruiter-logo">
            <img src="../../../assets/Microsoft-logo.jpg" alt="Recruiter 10" />
          </div>
          <div className="recruiter-logo">
            <img
              src="../../../assets/Saint-Gobain-Logo.png"
              alt="Recruiter 11"
            />
          </div>
          <div className="recruiter-logo">
            <img
              src="../../../assets/Tata_Consultancy_Services-Logo.svg.png"
              alt="Recruiter 12"
            />
          </div>
          <div className="recruiter-logo">
            <img src="../../../assets/Wipro-logo.png" alt="Recruiter 13" />
          </div>
          <div className="recruiter-logo">
            <img src="../../../assets/ibm_logo.png" alt="Recruiter 8" />
          </div>
        </div>
      </div>
      <br />
    </Box>
  );
};

export default Home;
