import axios from "axios";
import {BACKEND_HOST} from "../App";


export function getMovies(userId) {
    return axios.get(`${BACKEND_HOST}/movies?userId=${userId}`);
}

export function getMovie(movieId) {
    return axios.get(`${BACKEND_HOST}/movies/${movieId}`);
}

export function getWatchedMovies(userId) {
    return axios.get(`${BACKEND_HOST}/movies/watched/${userId}`);
}

export function getWantToWatchMovies(userId) {
    return axios.get(`${BACKEND_HOST}/movies/wantToWatch/${userId}`);
}

export function postMovie(json) {
    return axios.post(`${BACKEND_HOST}/movies`, json, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}

