import { html, render } from 'https://unpkg.com/lit-html?module';
import { getOneMovie} from '../services/movieServices.js';


const template = ({movie}) => html`
<div class="container">
    <div class="row bg-light text-dark">
        <h1>Movie title: ${movie.title}</h1>

        <div class="col-md-8">
            <img class="img-thumbnail" src="${movie.imageUrl}" alt="Movie">
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3 ">Movie Description</h3>
            <p>${movie.description}</p>
            <a class="btn btn-danger" href="#">Delete</a>
            <a class="btn btn-warning" href="#">Edit</a>
            <a class="btn btn-primary" href="#">Like</a>
            <span class="enrolled-span">Liked 1</span>
        </div>
    </div>
</div>
`;


class Details extends HTMLElement {

    connectedCallback() {
        getOneMovie(this.location.params.id)
            .then(movie=>{
                this.movie = movie;                
                this.render();
            });



    }


    render() {
        render(template(this), this, { eventContext: this });
    }

}

export default Details;
