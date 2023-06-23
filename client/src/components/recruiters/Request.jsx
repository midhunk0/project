import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { tokens } from "../../theme";

const Request=()=>{
    const colors=tokens();
    return(
        <Box display="flex" justifyContent="center" width="100%">
            <Box marginTop="30px" height="70px" display="flex" border="1px solid gray" borderRadius="5px">
                <Typography variant="h5"  padding="10px">Do you want to send a requst to admin</Typography>
                <Button 
                    variant="contained" 
                    sx={{
                        background: colors.gray[100], 
                        "&:hover": {background: colors.gray[100]},
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