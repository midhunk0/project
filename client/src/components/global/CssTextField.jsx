import { TextField, styled } from "@mui/material";


const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "#A0AAB4",
    },
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "#6F7E8C",
        },
    },
});


export default CssTextField;