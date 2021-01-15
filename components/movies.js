import { html, render } from 'https://unpkg.com/lit-html?module';
import { getAllMovies } from '../services/movieServices.js';
import { Router } from 'https://unpkg.com/@vaadin/router';

const template = (ctx) => html`<h1 class="text-center">Movies</h1>
<section>
    <a href="/createMovie" class="btn btn-warning ">Add Movie</a>
    <form class="search float-right" @submit="${ctx.onSearch}">
        <label>Search: </label>
        <input type="text" name="name">
        <button class="btn btn-info" type="submit">Search</button>
    </form>
</section>

<div class=" mt-3 ">
    <div class="row d-flex d-wrap">

        <div class="card-deck d-flex justify-content-center">
            ${ctx.movies?.map(movie => html`<movie-card .data=${movie}></movie-card>`)}
            ${ctx.movies?.length<1? html`<p>No movies!</p>` :''}
        </div>
    </div>
</div>
`;


class Movies extends HTMLElement {

    connectedCallback() {
        getAllMovies()
            .then(res => {
                this.movies = res;
                this.render();
            });

        this.render();

    }

    onSearch(e){
        e.preventDefault();

        this.movies = [];
        let formData = new FormData(e.target);
        let nameMovie = formData.get('name');
        
        getAllMovies(nameMovie)
        .then(res=>{                
                this.movies  = res;
                this.render();
            })

            this.render();
    }

    render() {
        render(template(this), this, { eventContext: this });
    }
}

export default Movies;