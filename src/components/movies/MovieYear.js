import { Typography } from "@mui/material";

function MovieYear(props) {
    return (
        <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
            {props.year ? "(" + props.year + ")" : null}
        </Typography>
    );
}

export default MovieYear;
