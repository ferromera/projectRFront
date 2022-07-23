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
import UserContext from "../../store/UserContext";
import classes from "./MainNavigation.module.css";

import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

function MainNavigation() {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    
    
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
    
    const buttonStyle = { padding: "10px 20px" };
    
    return (
        <Box >
            <AppBar position="static" >
                <Box >
                <Toolbar sx={{display:"flex", width:"100%", margin:"0 auto", maxWidth:"1000px"}}>
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
                        <div className={classes.searchbox}>
                            <SearchBar />
                        </div>
                    )}
                     <Box sx={{ flexGrow: 1 }} />
                    {userContext.user?.roles?.includes("ROLE_ADMIN") && (
                        <Button
                            sx={buttonStyle}
                            color="inherit"
                            onClick={goToNew}
                        >
                            New
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
                    {userContext.user && (
                        <UserMenu />
                    )}
                </Toolbar>
            </Box>
                
            </AppBar>
        </Box>
    );
}

export default MainNavigation;
