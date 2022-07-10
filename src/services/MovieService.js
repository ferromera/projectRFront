import axios from "axios";
import { BACKEND_HOST } from "../App";
import { authHeader } from "./AuthService";


export function getMovies(page, pageSize) {
    return axios.get(`${BACKEND_HOST}/movies?page=${page}&pageSize=${pageSize}`, {headers: authHeader()});
}

export function getMovie(movieId) {
    return axios.get(`${BACKEND_HOST}/movies/${movieId}`, {headers: authHeader()});
}

export function getWatchedMovies(page, pageSize) {
    return axios.get(`${BACKEND_HOST}/movies/watched?page=${page}&pageSize=${pageSize}`, {headers: authHeader()});
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
