import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {WatchedContextProvider} from "./store/WatchedContext";

//Prod
export const BACKEND_HOST = 'https://projectr-backend.herokuapp.com'
export const USER_ID = 4;
//Dev
//export const BACKEND_HOST = 'http://localhost:8080'
//export const USER_ID = 3;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <WatchedContextProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </WatchedContextProvider>
);

