import { Router } from 'https://unpkg.com/@vaadin/router';
import { getUserData, setWelcomeElement, setLogAndRegElement } from '../services/authServices.js';

import Home from './components/home-component.js';
import Register from './components/register-component.js';
import Login from './components/login-component.js';
import Movies from './components/movies.js';
import MovieCard from './components/movie-card-component.js';
import Details from './components/details-component.js';
import Edit from './components/edit-component.js';

customElements.define('home-component', Home);
customElements.define('login-component', Login);
customElements.define('register-component', Register);
customElements.define('movies-component', Movies);
customElements.define('movie-card', MovieCard);
customElements.define('movie-details', Details);
customElements.define('movie-edit', Edit);

const root = document.getElementById('root');


const router = new Router(root);

router.setRoutes([
  { path: '/', component: 'home-component' },
  { path: '/login', component: 'login-component' },
  { path: '/register', component: 'register-component' },
  { path: '/details/:id', component: 'movie-details' },
  { path: '/edit/:id', component: 'movie-edit' },
  {
    path: '/logout', action: () => {
      if (!window.localStorage.auth) {
        return Router.go('/');
      }

      window.localStorage.removeItem('auth');

      setWelcomeElement(getUserData());

      setLogAndRegElement('block');

      return Router.go('/login');
    }
  },
]);


