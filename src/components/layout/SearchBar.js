import {
    IconButton,
    InputAdornment,
    InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import classes from './SearchBar.module.css'
import { useNavigate } from "react-router-dom";

function SearchBar(props) {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/movies?r=1&search=" + searchQuery);
    };

    function handleChange(event) {
        setSearchQuery(event.target.value);
    }

    return (
        <div style={{display:"inline-block"}}>
            <form onSubmit={handleSubmit}>
                <InputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    id="search-bar"
                    label=""
                    size="small"
                    onChange={handleChange}
                    value={searchQuery}
                    color="secondary"
                    className={classes.search}
                    classes={{ focused: classes.searchFocused }}
                    startAdornment={(
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: "white" }} />
                        </InputAdornment>
                    )}
            
                />
                

                <IconButton type="submit" aria-label="search">
                    
                </IconButton>
            </form>
        </div>
    );
}

export default SearchBar;
