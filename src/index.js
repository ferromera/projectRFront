import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { WatchedContextProvider } from "./store/WatchedContext";
import { UserContextProvider } from "./store/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <UserContextProvider>
        <WatchedContextProvider>
            <HashRouter>
                <App />
            </HashRouter>
        </WatchedContextProvider>
    </UserContextProvider>
);
