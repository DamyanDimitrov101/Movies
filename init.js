import {Router} from 'https://unpkg.com/@vaadin/router';


import Home from './components/home-component.js';
import Register from './components/register-component.js';
import Login from './components/login-component.js';

customElements.define('home-component', Home);
customElements.define('login-component', Login);
customElements.define('register-component', Register);

const root = document.getElementById('root');


const router = new Router(root);
 
router.setRoutes([
    {path: '/', component: 'home-component'},
    {path: '/login', component: 'login-component'},
    {path: '/register', component: 'register-component'},
  ]);


