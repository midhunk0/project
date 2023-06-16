import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import { Container } from "react-bootstrap";
import "./index.css";

const Home = () => {
  const colors = tokens();
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
    <Box margin="10px">
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
      <Box margin="30px">
        <Box display="flex" justifyContent="center">
          <Typography variant="h2" color={colors.primary[300]}>
            Overview of Our
          </Typography>
          <Typography
            variant="h2"
            color={colors.redAccent[500]}
            marginLeft="10px"
          >
            {" "}
            Institute
          </Typography>
        </Box>
        <hr style={{ border: "1px groove", width: "25%" }} />
        <Container fluid className="box-container">
          <div className="box-text">
            The College of Engineering, Trivandrum was established in 1939 as
            the first Engineering College in the then Travancore State. The
            first classes were started on 3rd July 1939 during the reign of the
            Travancore King, Sri Chithira Thirunal Balarama Varma, and as the
            head of the then Travancore state, he deserves his share of credit
            in the establishment of the college. Initially, the College was
            housed in the former office and bungalow of the Chief Engineer
            (present PMG Office). Maj T.H. Mathewman, a Britisher, was the first
            Principal. Started as a constituent College of Travancore
            University, the College had an initial intake of 21 students each
            for Degree and Diploma courses in Civil, Mechanical, and Electrical
            branches. With the establishment of the Directorate of Technical
            Education in the late fifties, the College administration came under
            the control of the Government of Kerala. The College was shifted to
            the present sprawling 125 acres in 1960.
          </div>
        </Container>
      </Box>
      <Box margin="30px">
        <Box display="flex" justifyContent="center">
          <Typography variant="h2" color={colors.primary[300]}>
            Welcome To
          </Typography>
          <Typography
            variant="h2"
            color={colors.redAccent[500]}
            marginLeft="10px"
          >
            {" "}
            CGPU
          </Typography>
        </Box>
        <hr style={{ border: "1px groove", width: "25%" }} />
        <Container fluid className="box-container">
          <Box className="box-text">
            We at CET believe in combining the three facets that together spell
            success. Ability, Motivation and Attitude. To carve their own unique
            niche in today's ever growing technical world, engineers require
            exemplary technical prowess combined with effective inter personal
            skills. Today's dynamic corporate scenarios seek recruits who have
            both these skills in equal measure. Increasingly recognized by
            recruiters for its abundant talent pool and excellent facilities,
            CET's placement process aims to match the requirements of recruiters
            and the aspirations of students. The Career Guidance and Placement
            Unit (CGPU) was started in this college as a voluntary organization
            in January 1984. The Placement Officer who is assisted by student
            representatives from all the departments heads this unit. The
            Principal of the institution and all other faculty members have
            extended their wholehearted support to the functioning of the unit.
          </Box>
        </Container>
      </Box>

      <Box margin="30px">
        <Box display="flex" justifyContent="center">
          <Typography variant="h2" color={colors.primary[300]}>
            About
          </Typography>
          <Typography
            variant="h2"
            color={colors.redAccent[500]}
            marginLeft="10px"
          >
            {" "}
            CGPU
          </Typography>
        </Box>
        <hr style={{ border: "1px groove", width: "25%" }} />
        <Container fluid className="box-container" style={{ height: "400px" }}>
          <Box className="box-text">
            The Career Guidance and Placement Unit (CGPU) was started in this
            college as a voluntary organization in January 1984. The Placement
            Officer who is assisted by student representatives from all the
            departments heads this unit. The Principal of the institution and
            all other faculty members have extended their wholehearted support
            to the functioning of the unit. The unit is spread over an area of
            over 3500 sq.ft. It can accommodate 500 students at a time for
            written test. It has an amphitheatre for Pre-Placement Talk. The
            unit is equipped with a PA system, OHP, TV, VCR and an LCD
            projector. Other facilities include air-conditioned rooms for group
            discussions and interviews. The objectives of the unit are: To place
            final year students in respectable organizations through campus
            recruitment. To provide industrial training to students during their
            course of study. To organize lectures, seminars, group discussions,
            mock interviews etc. for career guidance, entrepreneurship and
            personality development. To provide information and assistance to
            students regarding. Job opportunities in India and abroad.
            Opportunities for self-employment. Opportunities for higher studies
            in India and abroad. Competitive examinations like GRE, GMAT, TOEFL,
            GATE, CAT etc. During the past few years, the campus is being
            regularly visited by almost all leading companies in India and on
            the average, the unit provides employment to over 350 students out
            of 450 every year. The Career Guidance and Placement Unit (CGPU)
            sends invitation letters, along with the Placement Programme
            containing the Job Announcement Form, to selected organisations. On
            receiving the reply, CGPU forwards the details of the eligible
            students to the company. A mutually convenient date is fixed for the
            campus visit. State-of-the-art facilities, for conducting the
            recruitment is provided by the unit. The recruitment process is
            completed in the campus itself. Offer letters, complete in all
            respects, are sent to the CGPU to follow the set norms.
          </Box>
        </Container>
      </Box>

      <Box margin="30px">
        <Box display="flex" justifyContent="center">
          <Typography variant="h2" color={colors.primary[300]}>
            Placement
          </Typography>
          <Typography
            variant="h2"
            color={colors.redAccent[500]}
            marginLeft="10px"
          >
            {" "}
            Statistics
          </Typography>
        </Box>
        <hr style={{ border: "1px groove", width: "25%" }} />
      </Box>

      <div class="container">
        
      </div>
    </Box>
  );
};

export default Home;
