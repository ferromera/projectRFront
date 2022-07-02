import axios from "axios";
import { BACKEND_HOST } from "../App";
import { authHeader } from "./AuthService";


export function getMovies() {
    return axios.get(`${BACKEND_HOST}/movies`, {headers: authHeader()});
}

export function getMovie(movieId) {
    return axios.get(`${BACKEND_HOST}/movies/${movieId}`, {headers: authHeader()});
}

export function getWatchedMovies() {
    return axios.get(`${BACKEND_HOST}/movies/watched`, {headers: authHeader()});
}

export function getWantToWatchMovies() {
    return axios.get(`${BACKEND_HOST}/movies/wantToWatch`, {headers: authHeader()});
}

export function postMovie(data) {
    return axios.post(`${BACKEND_HOST}/movies`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            ...authHeader()
        }
    });
}

export function deleteMovie(id) {
    return axios.delete(`${BACKEND_HOST}/movies/${id}`, {headers: authHeader()});
}
