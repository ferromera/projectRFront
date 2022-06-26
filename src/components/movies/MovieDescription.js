import { Typography } from "@mui/material";

function MovieDescription(props) {
    return (
        <Typography
            variant="p"
            component="div"
            sx={{ textAlign: "center", marginTop: "30px" }}
        >
            {props.text}
        </Typography>
    );
}

export default MovieDescription;