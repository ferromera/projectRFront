import {
    AppBar,
    Box,
    Button,
    IconButton,
    Link,
    Toolbar,
    Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../services/AuthService";
import { getWantToWatchMovies } from "../../services/MovieService";
import UserContext from "../../store/UserContext";

function MainNavigation() {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    function goToMovies() {
        navigate("/movies");
    }
    function goToWatched() {
        navigate("/movies/watched");
    }
    function goToWantToWatch() {
        navigate("/movies/wantToWatch");
    }
    function goToNew() {
        navigate("/movies/new");
    }
    function goHome() {
        navigate("/");
    }
    function goToLogin() {
        navigate("/login")
    }
    function goToSignUp() {
        navigate("/signup")
    }
    function doLogout() {
        logout();
        userContext.setUser(null);
        navigate("/");
    }
    const buttonStyle = { padding: "10px 20px" };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    ></IconButton>

                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ flexGrow: 1 }}
                        onClick={goHome}
                    >
                        Mediabry
                    </Typography>

                    {userContext.user?.roles?.includes("ROLE_USER") && (
                        <Button
                            sx={buttonStyle}
                            color="inherit"
                            onClick={goToMovies}
                        >
                            All
                        </Button>
                    )}
                    {userContext.user?.roles?.includes("ROLE_USER") && (
                        <Button
                            sx={buttonStyle}
                            color="inherit"
                            onClick={goToWatched}
                        >
                            Watched
                        </Button>
                    )}
                    {userContext.user?.roles?.includes("ROLE_USER") && (
                        <Button
                            sx={buttonStyle}
                            color="inherit"
                            onClick={goToWantToWatch}
                        >
                            Want to watch
                        </Button>
                    )}
                    {userContext.user?.roles?.includes("ROLE_ADMIN") && (
                        <Button
                            sx={buttonStyle}
                            color="inherit"
                            onClick={goToNew}
                        >
                            New
                        </Button>
                    )}
                    {userContext.user && (
                        <Button
                            sx={buttonStyle}
                            color="inherit"
                            onClick={doLogout}
                        >
                            Logout
                        </Button>
                    )}
                    {!userContext.user && (
                        <Button
                            sx={buttonStyle}
                            color="inherit"
                            onClick={goToLogin}
                        >
                            Log in
                        </Button>
                    )}
                    {!userContext.user && (
                        <Button
                            sx={buttonStyle}
                            color="inherit"
                            onClick={goToSignUp}
                        >
                            Sign up
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default MainNavigation;
