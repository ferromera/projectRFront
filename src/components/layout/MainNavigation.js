import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/AuthService";
import UserContext from "../../store/UserContext";

import SearchBar from "./SearchBar";

function MainNavigation() {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    
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
        navigate("/login");
    }
    function goToSignUp() {
        navigate("/signup");
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
                        sx={{ cursor: "pointer" }}
                        onClick={goHome}
                    >
                        Mediabry
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />

                    {userContext.user?.roles?.includes("ROLE_USER") && (
                        <div>
                            <SearchBar/>
                            <Button
                                sx={buttonStyle}
                                color="inherit"
                                onClick={goToWatched}
                            >
                                Watched
                            </Button>
                            <Button
                                sx={buttonStyle}
                                color="inherit"
                                onClick={goToWantToWatch}
                            >
                                Want to watch
                            </Button>
                        </div>
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
