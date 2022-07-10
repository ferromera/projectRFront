import { createContext, useState } from "react";
import { getCurrentUser } from "../services/AuthService";

const LoadingContext = createContext({
    isLoading: false,
    updated: false,
    setIsLoading: () => {} ,
    setUpdated: () => {} 
});

export function LoadingContextProvider(props) {
    const [loading, setLoading] = useState(false);
    const [updated, setUpdated] = useState(false);

    function setTheLoading(value) {
        setLoading(value);
    }
    function setTheUpdated(value) {
        setUpdated(value);
    }
    const context = {
        isLoading: loading,
        updated: updated,
        setIsLoading: setTheLoading,
        setUpdated: setTheUpdated
    };

    return (
        <LoadingContext.Provider value={context}>
            {props.children}
        </LoadingContext.Provider>
    );
}

export default LoadingContext;