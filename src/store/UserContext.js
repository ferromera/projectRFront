import { createContext, useState } from "react";
import { getCurrentUser } from "../services/AuthService";

const UserContext = createContext({
    user: null,
    setUser: () => {}
});

export function UserContextProvider(props) {
    const [user, setUser] = useState(getCurrentUser());

    function setTheUser(theUser) {
        setUser(theUser);
    }
    const context = {
        user: user,
        setUser: setTheUser
    };

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;