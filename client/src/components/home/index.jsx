import React from "react";
import { Box, Typography } from "@mui/material";
import { tokens } from "../../theme";


const Home = () => {
  const colors = tokens();
  return (
    <>
      <Box margin="10px">
        <div
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
          <div className="carousel-inner">
            <div className="carousel-item active">
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
            </div>
            <div className="carousel-item">
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
            </div>
            <div className="carousel-item">
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
            </div>
            <div className="carousel-item">
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
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
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
        <Box>
          <Typography variant="h6" style={{ marginBottom: "10px" }}>
            The College of Engineering, Trivandrum was established in 1939 as
            the first Engineering College in the then Travancore State. The
            first classes were started on 3rd July 1939 during the reign of the
            Travancore King, Sri Chithira Thirunal Balarama Varma and as the
            head of the then Travancore state he deserves his share of credit in
            the establishment of the college. Initially the College was housed
            in the former office and bungalow of the Chief Engineer (present PMG
            Office). Maj T.H. Mathewman, a Britisher was the first Principal.
            Started as a constituent College of Travancore University, the
            College had an initial intake of 21 students each for Degree and
            Diploma courses in Civil, Mechanical and Electrical branches. With
            the establishment of the Directorate of Technical Education in the
            late fifties, the College administration came under the control of
            the Government of Kerala. The College was shifted to the present
            sprawling 125 acres in 1960.
          </Typography>
        </Box>
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
        <Box>
          <Typography variant="h6" style={{ marginBottom: "10px" }}>
            We at CET believe in combining the three facets that together spell
            success. Ability, Motivation and Attitude.
          </Typography>
          <Typography variant="h6" style={{ marginBottom: "10px" }}>
            To carve their own unique niche in today's ever growing technical
            world, engineers require exemplary technical prowess combined with
            effective inter personal skills.
          </Typography>
          <Typography variant="h6" style={{ marginBottom: "10px" }}>
            Today's dynamic corporate scenarios seek recruits who have both
            these skills in equal measure. Increasingly recognized by recruiters
            for its abundant talent pool and excellent facilities, CET's
            placement process aims to match the requirements of recruiters and
            the aspirations of students.
          </Typography>
          <Typography variant="h6" style={{ marginBottom: "10px" }}>
            The Career Guidance and Placement Unit (CGPU) was started in this
            college as a voluntary organization in January 1984. The Placement
            Officer who is assisted by student representatives from all the
            departments heads this unit. The Principal of the institution and
            all other faculty members have extended their wholehearted support
            to the functioning of the unit.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Home;
