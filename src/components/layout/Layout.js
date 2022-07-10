import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import { useContext } from "react";
import LoadingContext from "../../store/LoadingContext";
import LoadingIndicator from "./LoadingIndicator";
import { Box } from "@mui/material";
import { usePromiseTracker } from "react-promise-tracker"

function Layout(props) {
    //const loadingContext = useContext(LoadingContext);
    const { promiseInProgress } = usePromiseTracker();
    return (
        <div>
            <MainNavigation />
            <LoadingIndicator />
            <Box sx={{ display: promiseInProgress ? "none" : "block" }}>
                <main className={classes.main}>{props.children}</main>
            </Box>
        </div>
    );
}

export default Layout;
