import { html, render } from 'https://unpkg.com/lit-html?module';
import {Router} from 'https://unpkg.com/@vaadin/router';
import { getUserData, register, setLogAndRegElement, setWelcomeElement } from "../services/authServices.js";

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

        <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
        </div>

        <button type="submit" class="btn btn-primary">Register</button>
    </form>
`;

class Register extends HTMLElement {

     connectedCallback(){
        this.render();
    }

    render(){
        render(template(this), this, {eventContext: this});
    }

    onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);

        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPassword = formData.get('repeatPassword');

        
        if (password.length < 6) {
            notify('password too short!', 'error');
            return;
        }

        
        if (password!= repeatPassword) {
            notify('password do not match!', 'error');
            return;
        }

        register(email,password)
            .then(res=>{
                if (res.hasOwnProperty('error')) {
                    throw new Error(res.error.message);
                }

                setWelcomeElement(getUserData());

                setLogAndRegElement('none');

                notify('Registered!');
                Router.go('/');
            })
            .catch(err=>{
                notify(err.message, 'error');
                return;
            });
    }
}

export default Register;