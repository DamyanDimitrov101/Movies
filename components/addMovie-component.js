import { html, render } from 'https://unpkg.com/lit-html?module';
import { getUserData } from '../services/authServices.js';
import { createMovie } from '../services/movieServices.js';

import { Router } from 'https://unpkg.com/@vaadin/router';


const template = (ctx) => html`
<form class="text-center border border-light p-5" @submit=${ctx.onSubmit}>
    <h1>Add Movie</h1>
    <div class="form-group">
        <label for="title">Movie Title</label>
        <input type="text" class="form-control" placeholder="Title" name="title" value="">
    </div>
    <div class="form-group">
        <label for="description">Movie Description</label>
        <textarea class="form-control" placeholder="Description" name="description"></textarea>
    </div>
    <div class="form-group">
        <label for="imageUrl">Image url</label>
        <input type="text" class="form-control" placeholder="Image Url" name="imageUrl" value="">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>


`;


class Create extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.user = getUserData();

        this.render();
    }

    onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let title = formData.get('title');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');


        createMovie(title, description, imageUrl, this.user.uid)
            .then(res => {
                notify('Created successfully!')
                Router.go(`/`);
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

export default Create;
