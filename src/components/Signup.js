// @flow

import React from "react";
import {Link, Redirect} from "react-router-dom";

import {signup} from "../api";

import {Container, Divider, Form, Grid, Header, Message, Segment} from "semantic-ui-react";
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
        confirmPassword: "",
        error: null,
        confirmPasswordError: true,
        redirectToReferrer: false
    };

    handleChange = (e, {name, value}) => {
        switch (name) {
            case('login'):
                break;
            case ('firstname'):
                break;
            case ('lastname'):
                break;
            case ('password'):
                this.setState({confirmPasswordError: this.state.confirmPassword !== value});
                break;
            case ('confirmPassword'):
                this.setState({confirmPasswordError: this.state.password !== value});
                break;

        }
        this.setState({[name]: value});
    };

    handleSubmit = (event: Event) => {
        console.log('submitting...');
        event.preventDefault();
        const {login, firstname, lastname, password} = this.state;
        signup(login, firstname, lastname, password)
            .catch(error => this.setState({error}))
            .then(result => {
                if(this.state.error){
                    return;
                }
                console.log("login in...");
                this.props.authenticate(login, password, error => {
                    if (error) {
                        this.setState({error});
                    } else {
                        this.setState({redirectToReferrer: true, error: null});
                    }
                });
            });
    };

    render() {
        const {redirectToReferrer, error} = this.state;

        if (redirectToReferrer) {
            return <Redirect to="/"/>;
        }

        return (
            <Container>
                <Segment.Group>
                    <Segment textAlign={'center'} inverted size={'massive'}>
                        <header>
                            Welcome to WED3 Finances Inc.
                        </header>
                    </Segment>
                    <Segment placeholder>
                        <Form onSubmit={this.handleSubmit} error={this.state.error}>
                            <Grid columns={3} centered>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Form.Input label='First name' placeholder='First name'
                                                    name={'firstname'}
                                                    value={this.state.firstname}
                                                    onChange={this.handleChange}
                                        />
                                    </Grid.Column>
                                    <Grid.Column textAlign={'left'} verticalAlign={'bottom'}>
                                        {!this.state.firstname && <p>Please specify your first name.</p>}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Form.Input label='Last name' placeholder='Last name'
                                                    name={'lastname'}
                                                    value={this.state.lastname}
                                                    onChange={this.handleChange}
                                        />
                                    </Grid.Column>
                                    <Grid.Column textAlign={'left'} verticalAlign={'bottom'}>
                                        {!this.state.lastname && <p>Please specify your last name.</p>}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Form.Input label='User name' placeholder='User'
                                                    name={'login'}
                                                    value={this.state.login}
                                                    onChange={this.handleChange}
                                        />
                                    </Grid.Column>
                                    <Grid.Column textAlign={'left'} verticalAlign={'bottom'}>
                                        {this.state.login.length < 3 &&
                                        <p>Please specify your login, at least three characters.</p>}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Form.Input label='Password' type='Password'
                                                    placeholder='Password'
                                                    name={'password'}
                                                    value={this.state.password}
                                                    onChange={this.handleChange}
                                        />
                                    </Grid.Column>
                                    <Grid.Column textAlign={'left'} verticalAlign={'bottom'}>
                                        {this.state.password.length < 3 &&
                                        <p>Please specify your password, at least three characters.</p>}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Form.Input label='Confirm Password' type='Password'
                                                    placeholder='Password'
                                                    name={'confirmPassword'}
                                                    value={this.state.confirmPassword}
                                                    onChange={this.handleChange}
                                        />
                                    </Grid.Column>
                                    <Grid.Column textAlign={'left'} verticalAlign={'bottom'}>
                                        {this.state.confirmPasswordError && <p>Please confirm your password.</p>}
                                    </Grid.Column>
                                </Grid.Row>
                                <Message
                                    error
                                    header={'Registration Failed!'}
                                    content={'This username is already taken, Sorry.'}
                                />
                                <Grid.Row>
                                    <Grid.Column>
                                        <Button
                                            onClick={this.handleSubmit}
                                            content='Einloggen'
                                            primary
                                            disabled={
                                                !this.state.firstname
                                                || !this.state.lastname
                                                || this.state.login.length < 3
                                                || this.state.password.length < 3
                                                || this.state.confirmPasswordError
                                            }
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                        </Form>
                    </Segment>
                </Segment.Group>
            </Container>
        );
    }
}

export default Signup;
