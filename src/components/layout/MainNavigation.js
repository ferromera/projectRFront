import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import {useNavigate} from "react-router-dom";

function MainNavigation() {
    const navigate = useNavigate();
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
          >
          
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Movies
          </Typography>
          <Button sx={buttonStyle} color="inherit" onClick={goToMovies}>All</Button>
          <Button sx={buttonStyle} color="inherit" onClick={goToWatched}>Watched</Button>
          <Button sx={buttonStyle} color="inherit" onClick={goToWantToWatch}>Want to watch</Button>
          <Button sx={buttonStyle} color="inherit" onClick={goToNew}>New</Button>
         </Toolbar>
      </AppBar>
    </Box>
        // <header className={classes.header}>
        //     <div className={classes.logo}>Movies</div>
        //     <nav>
        //         <ul>
        //             <li>
        //                 <Link to='/movies'>All</Link>
        //             </li>
        //             <li>
        //                 <Link to='/movies/watched'>Watched</Link>
        //             </li>
        //             <li>
        //                 <Link to='/movies/wantToWatch'>Want to watch</Link>
        //             </li>
        //             <li>
        //                 <Link to='/movies/new'>New</Link>
        //             </li>
        //         </ul>
        //     </nav>
        // </header>
    );
}

export default MainNavigation;