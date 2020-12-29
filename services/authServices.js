import { request } from "./requestService.js";

const apiKey = 'AIzaSyDIzVTs8hjo-cdaCGNR0gyvjbgwJzNGtCw';
const registerURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

export const register = async (email, password) => {

    let res = await request(registerURL, 'POST', {
        email,
        password,
        returnSecureToken: true
    });

    localStorage.setItem('auth', JSON.stringify(res));

    return res;
}