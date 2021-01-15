import { html, render } from 'https://unpkg.com/lit-html?module';

import { Router } from 'https://unpkg.com/@vaadin/router';


const template = (ctx) => html`
    <h1>Deleting!</h1>

    <h3>Please wait.</h3>
`;


class Delete extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }


    render() {
        render(template(this), this, { eventContext: this });
    }

}

export default Delete;
