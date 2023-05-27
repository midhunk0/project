import { Box, Typography } from "@mui/material";
import React from "react";

const ContactBox=({ heading, list })=>{
    return(
        <Box margin="20px">
            <Typography variant="h4">{heading}</Typography>
            <Typography component="div">
                <ul style={{listStyleType:"none"}}>
                    {list.map((item, index)=>(
                        <li key={index} style={{marginBottom:"10px"}}>
                            {item}
                        </li>
                    ))}
                </ul>
            </Typography>
        </Box>
    )
}

const Contact=()=>{
    return(
        <Box display="flex" justifyContent="center">
            <ContactBox
                heading="Address:"
                list={[
                    "Career Guidance and Placement Unit  ( CGPU )",
                    "College of Engineering,",
                    "Thiruvananthapuram - *** ***",
                    "KERALA, South India.",
                    "Phone: **** - *******, *******"
                ]}
            />
            <ContactBox
                heading="Contact Person:"
                list={[
                    "Dr. K. Sunil Kumar",
                    "Training and Placement Officer",
                    "College of Engineering Trivandrum, Thiruvananthapuram - 695 016.",
                    "Mobile: **********",
                    "Phone Office : **** *******",
                    <Typography>Email : <a href="/">placement.com</a></Typography>                
                ]}
            />
        </Box>
    )
}

export default Contact;