import { Typography } from "@mui/material";

function PageTitle(props) {
    return (
        <Typography
            variant="h4"
            component="div"
            sx={{ textAlign: "center", marginBottom: "50px" }}
        >
            {props.text}
        </Typography>
    );
}

export default PageTitle;
