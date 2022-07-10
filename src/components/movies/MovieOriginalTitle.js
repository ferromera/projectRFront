import { Typography } from "@mui/material";

function MovieOriginalTitle(props) {
    return (
        <Typography
            variant="p"
            component="div"
            sx={{ textAlign: "center", marginTop: "10px", fontSize:"0.9rem"}}
        >
            Título original: {props.text}
        </Typography>
    );
}

export default MovieOriginalTitle;