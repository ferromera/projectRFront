import { createContext, useState } from 'react';

const WatchedContext = createContext({
    watched: [],
    updated: true,
    addWatched: () => {},
    removeWatched: () => {},
    itemIsWatched: () => {} ,
    setUpdated: () => {}
});

export function WatchedContextProvider(props) {
    const [userWatched, setUserWatched] = useState([]);
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

    const context = {
        watched: userWatched,
        updated: isUpdated,
        addWatched: addWatchedHandler,
        removeWatched: removeWatchedHandler,
        itemIsWatched: itemIsWatchedHandler,
        setUpdated: setIsUpdated
    };

    return (
        <WatchedContext.Provider value={context}>
            {props.children}
        </WatchedContext.Provider>
    );
}

export default WatchedContext;