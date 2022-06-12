import axios from "axios";
import {BACKEND_HOST} from "../App";


export function postUserMovie(data) {
    return axios.post(`${BACKEND_HOST}/usermovies`, data);
}
