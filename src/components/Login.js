// @flow

import React from "react";
import {Redirect, Link} from "react-router-dom";
import {Grid} from "semantic-ui-react";
import {Form} from "semantic-ui-react";
import {Button, Divider, Segment} from "semantic-ui-react";
import {Header} from "semantic-ui-react";
import {Message} from "semantic-ui-react";

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
        redirectToReferrer: false
    };

    handleLoginChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({login: event.target.value});
        }
    };

    handlePasswordChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({password: event.target.value});
        }
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
            from: {pathname: "/dashboard"}
        };
        const {redirectToReferrer, error} = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from}/>;
        }

        return (
            <div>
                <h1>Bank of Rapperswil</h1>
                <Segment placeholder style={{maxWidth:'50%'}}>
                    <Grid columns={2} relaxed='very' stackable>
                        <Grid.Column>
                            <Form error={error}>
                                <Header as='h2'>Login</Header>
                                <Form.Input icon='user' iconPosition='left'
                                            label='Username' placeholder='User'
                                            value={this.state.login}
                                            onChange={this.handleLoginChanged}/>
                                <Form.Input icon='lock' iconPosition='left'
                                            label='Password' type='Password'
                                            placeholder='Password'
                                            value={this.state.password}
                                            onChange={this.handlePasswordChanged}/>
                                <Message
                                    error
                                    header='Action Forbidden'
                                    content='You can only sign up for an account once with a given e-mail address.'
                                />
                                <Button onClick={this.handleSubmit} content='Einloggen' primary />
                            </Form>
                        </Grid.Column>

                        <Grid.Column verticalAlign='middle'>
                            <Button as={Link} to='/signup' content='Registrieren' icon='signup' size='big' />
                        </Grid.Column>
                    </Grid>

                    <Divider vertical>Oder</Divider>
                </Segment>
            </div>
        );
    }
}

export default Login;
