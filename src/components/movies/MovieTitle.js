import { Typography } from "@mui/material";

function MovieTitle(props) {
    return (
        <Typography
            variant="h4"
            component="div"
            sx={{ textAlign: "center", marginBottom: "10px" }}
        >
            {props.text}
        </Typography>
    );
}

export default MovieTitle;