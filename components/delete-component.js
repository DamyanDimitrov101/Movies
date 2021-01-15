import { html, render } from 'https://unpkg.com/lit-html?module';

import { Router } from 'https://unpkg.com/@vaadin/router';


const template = (ctx) => html`
    <section id="deleteComponent">
    <h2>Deleting!</h2>

    <p>Please wait.</p>
    </section>  
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
