import { html, render } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';
import { login, setLogAndRegElement } from "../services/authServices.js";

const template = (ctx) => html`
    <form class="text-center border border-light p-5" @submit=${ctx.onSubmit}>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>
    
        <button type="submit" class="btn btn-primary">Login</button>
    </form>
`;


class Login extends HTMLElement {

    connectedCallback() {
        this.render();
    }


    render() {
        render(template(this), this, { eventContext: this });
    }

    onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let email = formData.get('email');
        let password = formData.get('password');


        if (password.length < 6) {
            notify('password too short!', 'error');
            return;
        }



        login(email, password)
            .then(res => {
                if (res.hasOwnProperty('error')) {
                    console.clear();
                    throw new Error(res.error.message);
                }

                setLogAndRegElement('none');

                notify('Logged in!');
                Router.go('/');    
            })
            .catch(err => {
                notify(err.message, 'error');
                return;
            });

    }
}

export default Login;
