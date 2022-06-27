import axios from "axios";
import { BACKEND_HOST } from "../App";

export async function login(json) {
    const response = await axios.post(`${BACKEND_HOST}/auth/signin`, json);
    if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
}

export function signup(json) {
    return axios.post(`${BACKEND_HOST}/auth/signup`, json);
}
export function getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
}

export function logout() {
    localStorage.removeItem("user");
}

export function authHeader() {
    const user = getCurrentUser();
    if (user && user.accessToken) {
        return { Authorization: "Bearer " + user.accessToken };
    } else {
        return {};
    }
}