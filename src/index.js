import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { WatchedContextProvider } from "./store/WatchedContext";
import { UserContextProvider } from "./store/UserContext";
import { LoadingContextProvider } from "./store/LoadingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <LoadingContextProvider>
        <UserContextProvider>
            <WatchedContextProvider>
                <HashRouter>
                    <App />
                </HashRouter>
            </WatchedContextProvider>
        </UserContextProvider>
    </LoadingContextProvider>
);
