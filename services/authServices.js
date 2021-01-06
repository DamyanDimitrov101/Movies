import { request } from "./requestService.js";

const apiKey = 'AIzaSyDIzVTs8hjo-cdaCGNR0gyvjbgwJzNGtCw';
const registerURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
const loginURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

export const register = async (email, password) => {

    let res = await request(registerURL, 'POST', {
        email,
        password,
        returnSecureToken: true
    });

    localStorage.setItem('auth', JSON.stringify(res));

    return res;
}

export const login = async (email, password) => {

    let res = await request(loginURL, 'POST', {
        email,
        password,
        returnSecureToken: true
    });

    if (res.hasOwnProperty('error')) {
        notify(res.error.message, 'error');         
    }else{
        localStorage.setItem('auth', JSON.stringify(res));
    }


    return res;
}

export const getUserData = () => {
    try {
        let data = JSON.parse(localStorage.getItem('auth'));
        return {
            isAuthenticated: Boolean(data.idToken),
            email: data.email,
            uid: data.localId
        }
    } catch (error) {
        return {
            isAuthenticated: false,
            email: '',
            uid: ''
        }
    }
}

export const setWelcomeElement = (user) => {
    if (user.email!='') {        
        let welcomeElement = document.getElementById('welcomeTag');
        welcomeElement.textContent = `Welcome ${user.email}`;
    }else{            
        let welcomeElement = document.getElementById('welcomeTag');
        welcomeElement.textContent = ``;
    }
}


export const setLogAndRegElement = (typeDisplay) => {    
    let loginElement = document.getElementById('loginElement');
    let registerElement = document.getElementById('registerElement');

    loginElement.style.display =  typeDisplay;
    registerElement.style.display = typeDisplay;

}