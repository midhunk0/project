import React, { useContext } from "react";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const Request = () => {

    const [action, setAction] = useState(false);
    const { user } = useContext(AuthContext);
    const id = user._id;
    console.log(id)

    const handleRequest = async (e) => {
        setAction(true);
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/recruiters/recruiterRequest/${id}`,
                {
                    action: action
                });
        } catch (err) {
            console.log(err);
        }
    }
    const colors = tokens();
    return (
        <Box display="flex" justifyContent="center" width="100%">
            <Box marginTop="30px" height="70px" display="flex" border="1px solid gray" borderRadius="5px">
                <Typography variant="h5" padding="10px">Do you want to send a requst to admin</Typography>
                <Button onClick={handleRequest}
                    variant="contained"
                    sx={{
                        background: colors.gray[100],
                        "&:hover": { background: colors.gray[100] },
                        margin: "10px"
                    }}
                >
                    Request
                </Button>
            </Box>
        </Box>
    )
}

export default Request;