
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../store/UserContext";
import Login from "./Login";

function Home() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=> {
        if (userContext.user != null) {
            navigate("/movies")
        }
    })
   
    return (
        <Login></Login>
    );
}

export default Home;
