// @flow

import React from "react";
import {Redirect, Link} from "react-router-dom";
import {Container, Grid} from "semantic-ui-react";
import {Form} from "semantic-ui-react";
import {Button, Divider, Segment} from "semantic-ui-react";
import {Header} from "semantic-ui-react";

export type Props = {
    /* Callback to submit an authentication request to the server */
    authenticate: (
        login: string,
        password: string,
        callback: (error: ?Error) => void
    ) => void,
    /* We need to know what page the user tried to access so we can
       redirect after logging in */
    location: {
        state?: {
            from: string
        }
    }
};

class Login extends React.Component<Props, *> {
    state = {
        login: "",
        password: "",
        error: undefined,
        usernameTooShortError: true,
        passwordTooShortError: true,
        redirectToReferrer: false
    };

    handleChange = (e, {name, value}) => {
        switch (name) {
            case('login'):
                this.setState({usernameTooShortError: value.length < 3});
                break;
            case ('password'):
                this.setState({passwordTooShortError: value.length < 3});
                break;
        }
        this.setState({[name]: value});
    };

    handleSubmit = (event: Event) => {
        event.preventDefault();
        const {login, password} = this.state;
        this.props.authenticate(login, password, error => {
            if (error) {
                this.setState({error});
            } else {
                this.setState({redirectToReferrer: true, error: null});
            }
        });
    };

    render() {
        const {from} = this.props.location.state || {
            from: {pathname: "/"}
        };
        const {redirectToReferrer, error} = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from}/>;
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
                        <Grid columns={2} textAlign={'center'} relaxed='very' stackable>
                            <Grid.Column>
                                <Form>
                                    <Header as='h2'>Login</Header>
                                    <Form.Input icon='user' iconPosition='left'
                                                label='Username' placeholder='User'
                                                name={'login'}
                                                value={this.state.login}
                                                onChange={this.handleChange}
                                    />
                                    {this.state.usernameTooShortError && <p>Please specify your login, at least three characters.</p>}
                                    <Form.Input icon='lock' iconPosition='left'
                                                label='Password' type='Password'
                                                placeholder='Password'
                                                name={'password'}
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                    />
                                    {this.state.passwordTooShortError && <p>Please specify your login, at least three characters.</p>}
                                    <Button
                                        onClick={this.handleSubmit}
                                        content='Einloggen'
                                        primary
                                        disabled = {
                                            this.state.passwordTooShortError
                                            || this.state.usernameTooShortError
                                        }
                                    />
                                </Form>
                            </Grid.Column>

                            <Grid.Column verticalAlign='middle'>
                                <Button as={Link} to={'/signup'} content='Registrieren' icon='signup' size='big'/>
                            </Grid.Column>
                        </Grid>

                        <Divider vertical>Oder</Divider>
                    </Segment>
                </Segment.Group>
            </Container>

        );
    }
}

export default Login;
