import { html, render } from 'https://unpkg.com/lit-html?module';
import { getOneMovie, likeMovie } from '../services/movieServices.js';
import { getUserData } from '../services/authServices.js';

import {Router} from 'https://unpkg.com/@vaadin/router';

const hasLiked = (likes, uid) => {
    
    return Object
            .values(likes)
            .some(like=> like == uid);
}


const template = ({ movie, user, onLike}) => html`
<div class="container">
    <div class="row bg-light text-dark">
        <h1>Movie title: ${movie.title}</h1>

        <div class="col-md-8">
            <img class="img-thumbnail" src="${movie.imageUrl}" alt="Movie">
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3 ">Movie Description</h3>
            <p>${movie.description}</p>
            ${user.uid === movie._ownerId
                ?
                html`<a class="btn btn-danger" href="#">Delete</a>
                     <a class="btn btn-warning" href="#">Edit</a>
                    `
                :
                html`    
                        ${hasLiked(movie.likes, user.uid)
                            ? html`<span class="enrolled-span">Liked 1</span>`
                            : html`<a class="btn btn-primary" @click=${onLike}>Like</a>`
                        }                         
                    `
            }
        </div>
    </div>
</div>
`;


class Details extends HTMLElement {
    constructor() {
        super();

        this.user = getUserData();
    }

    connectedCallback() {
        getOneMovie(this.location.params.id)
            .then(movie => {
                this.movie = movie;

                this.render();
            });
    }

    onLike(e){
        likeMovie(this.location.params.id, this.user.uid)
            .then(res=>{

                Router.go(`/`);

                console.log('liked');
            })
    }


    render() {
        render(template(this), this, { eventContext: this });
    }

}

export default Details;
