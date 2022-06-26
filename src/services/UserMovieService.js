import axios from "axios";
import {BACKEND_HOST} from "../App";
import { authHeader } from "./AuthService";


export function postUserMovie(data) {
    return axios.post(`${BACKEND_HOST}/usermovies`, data, {
        headers: authHeader()
    });
}
