import axios from "axios";
import { BACKEND_HOST } from "../App";
import { authHeader } from "./AuthService";


export function getMovies(page, pageSize, search, anyOrAllGenre, genres) {
    let url = `${BACKEND_HOST}/movies`;
    let hasQueryParam = false;
    if (page) {
        url += `?page=${page}`;
        hasQueryParam = true;
    }
    if (pageSize) {
        if (hasQueryParam) {
            url += `&pageSize=${pageSize}`;
        } else {
            url += `?pageSize=${pageSize}`;
        }
        hasQueryParam = true;
    }
    if (search) {
        if (hasQueryParam) {
            url += `&search=${search}`;
        } else {
            url += `?search=${search}`;
        }
        hasQueryParam = true;
    }
    if (anyOrAllGenre === "true" || anyOrAllGenre === "false") {
        if (hasQueryParam) {
            url += `&anyGenre=${anyOrAllGenre}`;
        } else {
            url += `?anyGenre=${anyOrAllGenre}`;
        }
        hasQueryParam = true;
    }
    if (genres) {
        if (hasQueryParam) {
            url += `&genres=${genres}`;
        } else {
            url += `?genres=${genres}`;
        }
        hasQueryParam = true;
    }
    return axios.get(url, {headers: authHeader()});
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
