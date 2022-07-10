import axios from "axios";
import {BACKEND_HOST} from "../App";


export function getGenres() {
    return axios.get(`${BACKEND_HOST}/genres`);
}
