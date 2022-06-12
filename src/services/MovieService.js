import axios from "axios";
import {BACKEND_HOST} from "../App";


export function getMovies() {
    return axios.get(`${BACKEND_HOST}/movies`);
}

export function postMovie(json) {
    return axios.post(`${BACKEND_HOST}/movies`, json);

}
