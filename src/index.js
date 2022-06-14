import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {HashRouter} from "react-router-dom";
import {WatchedContextProvider} from "./store/WatchedContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <WatchedContextProvider>
        <HashRouter>
            <App/>
        </HashRouter>
    </WatchedContextProvider>
);

