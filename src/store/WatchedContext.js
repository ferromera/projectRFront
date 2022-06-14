import { createContext, useState } from 'react';

const WatchedContext = createContext({
    watched: [],
    wantToWatch: [],
    updated: true,
    addWatched: () => {},
    removeWatched: () => {},
    itemIsWatched: () => {} ,
    addWantToWatch: () => {},
    removeWantToWatch: () => {},
    itemIsWantToWatch: () => {},
    setUpdated: () => {}
});

export function WatchedContextProvider(props) {
    const [userWatched, setUserWatched] = useState([]);
    const [userWantToWatch, setUserWantToWatch] = useState([]);
    const [isUpdated, setIsUpdated] = useState([]);

    function addWatchedHandler(movie) {
        setUserWatched((prevWatched) => {
            return prevWatched.concat(movie);
        });
    }

    function removeWatchedHandler(movieId) {
        setUserWatched(prevWatched => {
            return prevWatched.filter(movie => movie.id !== movieId);
        });
    }

    function itemIsWatchedHandler(movieId) {
        return userWatched.some(movie => movie.id === movieId);
    }

    function addWantToWatchHandler(movie) {
        setUserWantToWatch((prevWantToWatch) => {
            return prevWantToWatch.concat(movie);
        });
    }

    function removeWantToWatchHandler(movieId) {
        setUserWantToWatch(prevWantToWatch => {
            return prevWantToWatch.filter(movie => movie.id !== movieId);
        });
    }

    function itemIsWantToWatchHandler(movieId) {
        return userWantToWatch.some(movie => movie.id === movieId);
    }

    const context = {
        watched: userWatched,
        wantToWatch: userWatched,
        updated: isUpdated,
        addWatched: addWatchedHandler,
        removeWatched: removeWatchedHandler,
        itemIsWatched: itemIsWatchedHandler,
        addWantToWatch: addWantToWatchHandler,
        removeWantToWatch: removeWantToWatchHandler,
        itemIsWantToWatch: itemIsWantToWatchHandler,
        setUpdated: setIsUpdated
    };

    return (
        <WatchedContext.Provider value={context}>
            {props.children}
        </WatchedContext.Provider>
    );
}

export default WatchedContext;