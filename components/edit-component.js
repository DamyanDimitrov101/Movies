import { html, render } from 'https://unpkg.com/lit-html?module';
import { getOneMovie, editMovie } from '../services/movieServices.js';

import { Router } from 'https://unpkg.com/@vaadin/router';


const template = (ctx) => html`

<form class="text-center border border-light p-5" @submit=${ctx.onSubmit}>
    <h1>Edit Movie</h1>
    <div class="form-group">
        <label for="title">Movie Title</label>
        <input type="text" class="form-control" placeholder="Movie Title" value="${ctx.movie.title}" name="title">
    </div>
    <div class="form-group">
        <label for="description">Movie Description</label>
        <textarea class="form-control" placeholder="Movie Description..." name="description">${ctx.movie.description}</textarea>
    </div>
    <div class="form-group">
        <label for="imageUrl">Image url</label>
        <input type="text" class="form-control" placeholder="Image Url" value="${ctx.movie.imageUrl}" name="imageUrl">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>

`;


class Edit extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        getOneMovie(this.location.params.id)
            .then(movie => {
                this.movie = movie;

                this.render();
            });
    }

    onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);

        let title = formData.get('title');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');


        editMovie(this.movie._id,title,description,imageUrl)
            .then(res=>{
                notify('Edited successfully!')
                Router.go(`/details/${this.movie._id}`);
            })
            .catch(err => {
                notify(err.message, 'error');
                return;
            });
    }

    render() {
        render(template(this), this, { eventContext: this });
    }

}

export default Edit;
