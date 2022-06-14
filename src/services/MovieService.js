import axios from "axios";
import {BACKEND_HOST} from "../App";


export function getMovies(userId) {
    return axios.get(`${BACKEND_HOST}/movies?userId=${userId}`);
}

export function getWatchedMovies(userId) {
    return axios.get(`${BACKEND_HOST}/movies/watched/${userId}`);
}

export function getWantToSeeMovies(userId) {
    return axios.get(`${BACKEND_HOST}/movies/wantToWatch/${userId}`);
}

export function postMovie(json) {
    return axios.post(`${BACKEND_HOST}/movies`, json);

}
