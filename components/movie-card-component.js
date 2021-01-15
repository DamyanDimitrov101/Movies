import { html, render } from 'https://unpkg.com/lit-html?module';


const template = ({data:{imageUrl,title, key}}) => html`
    <div class="card mb-4">
        <img class="card-img-top" src="${imageUrl}"
            alt="Card image cap" width="400">
        <div class="card-body">
            <h4 class="card-title">${title}</h4>
        </div>
        <div class="card-footer">
            <a href="/details/${key}"><button type="button" class="btn btn-info">Details</button></a>
        </div>

    </div>
`;

class MovieCard extends HTMLElement {

    connectedCallback() {
        
        this.render();
    }

    render() {
        render(template(this), this, { eventContext: this });
    }

}

export default MovieCard;