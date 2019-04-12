// @flow

import React from "react";
import {Redirect} from "react-router-dom";

import {signup} from "../api";

import {Form, Message} from "semantic-ui-react";
import {Button} from "semantic-ui-react";

type Props = {};

type State = {
    login: string,
    firstname: string,
    lastname: string,
    password: string,
    error: ?Error,
    redirectToReferrer: boolean
};

class Signup extends React.Component<Props, State> {
    state = {
        login: "",
        firstname: "",
        lastname: "",
        password: "",
        error: null,
        redirectToReferrer: false
    };

    handleLoginChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({login: event.target.value});
        }
    };

    handleFirstNameChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({firstname: event.target.value});
        }
    };

    handleLastNameChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({lastname: event.target.value});
        }
    };

    handlePasswordChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({password: event.target.value});
        }
    };

    handleSubmit = (event: Event) => {
        event.preventDefault();
        const {login, firstname, lastname, password} = this.state;
        signup(login, firstname, lastname, password)
            .then(result => {
                console.log("Signup result ", result);
                this.setState({redirectToReferrer: true, error: null});
            })
            .catch(error => this.setState({error}));
    };

    render() {
        const {redirectToReferrer, error} = this.state;

        if (redirectToReferrer) {
            return <Redirect to="/login"/>;
        }

        return (
            <div>
                <h1>Bank of Rapperswil</h1>
                <form>
                    <h2>Registrieren</h2>
                    <input
                        onChange={this.handleLoginChanged}
                        placeholder="Login"
                        value={this.state.login}
                    />
                    <input
                        onChange={this.handleFirstNameChanged}
                        placeholder="Vorname"
                        value={this.state.firstname}
                    />
                    <input
                        onChange={this.handleLastNameChanged}
                        placeholder="Nachname"
                        value={this.state.lastname}
                    />
                    <input
                        onChange={this.handlePasswordChanged}
                        placeholder="Passwort"
                        type="password"
                        value={this.state.password}
                    />
                    <button onClick={this.handleSubmit}>Account eröffnen</button>
                </form>
                <Form style={{maxWidth: '50%'}} error={error}>
                    <Form.Input fluid label='Username' placeholder='Username'
                                required onChange={this.handleLoginChanged}/>
                    <Form.Input fluid label='Vorname' placeholder='Vorname'
                                required onChange={this.handleFirstNameChanged}/>
                    <Form.Input fluid label='Nachname' placeholder='Nachname' />
                    <Form.Input type='password' fluid label='Password' placeholder='Password' required/>
                    <Button onClick={this.handleSubmit} content='Account eröffnen'/>
                    <Message
                        error
                        header='Action Forbidden'
                        content='You can only sign up for an account once with a given e-mail address.'
                    />
                </Form>
            </div>
        );
    }
}

export default Signup;
