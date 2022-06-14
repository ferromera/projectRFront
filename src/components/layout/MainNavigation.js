import {Link} from "react-router-dom";

import classes from './MainNavigation.module.css'

function MainNavigation() {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>Movies</div>
            <nav>
                <ul>
                    <li>
                        <Link to='/projectRFront/#/movies'>All</Link>
                    </li>
                    <li>
                        <Link to='/projectRFront/#/movies/watched'>Watched</Link>
                    </li>
                    <li>
                        <Link to='/projectRFront/#/movies/wantToWatch'>Want to watch</Link>
                    </li>
                    <li>
                        <Link to='/projectRFront/#/movies/new'>New</Link>
                    </li>
                </ul>
            </nav>
        </header>);
}

export default MainNavigation;