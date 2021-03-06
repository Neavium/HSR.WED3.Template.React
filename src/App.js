// @flow

import React from "react";
import {BrowserRouter as Router, Link, Redirect, Route, withRouter} from "react-router-dom";

import 'semantic-ui-css/semantic.min.css';

import Login from "./components/Login";
import Signup from "./components/Signup";
import {Button, Menu} from "semantic-ui-react";

import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import AllTransactions from "./components/AllTransactions";

import type {User} from "./api";
import * as api from "./api";

// The following are type definitions for Flow,
// an optional type checker for JavaScript. You
// can safely ignore them for now.
type Props = {};

type State = {
    isAuthenticated: boolean,
    token: ?string,
    user: ?User
};

class App extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        const token = sessionStorage.getItem("token");
        const user = sessionStorage.getItem("user");
        // Initialize the state, the constructor is the
        // only place where it's ok to directly assign
        // a value to this.state. For all other state
        // changes, use this.setState.
        if (token && user) {
            this.state = {
                isAuthenticated: true,
                token,
                user: JSON.parse(user)
            };
        } else {
            this.state = {
                isAuthenticated: false,
                token: undefined,
                user: undefined
            };
        }
    }

    authenticate = (
        login: string,
        password: string,
        callback: (error: ?Error) => void
    ) => {
        api
            .login(login, password)
            .then(({token, owner}) => {
                this.setState({isAuthenticated: true, token, user: owner});
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("user", JSON.stringify(owner));
                callback(null);
            })
            .catch(error => callback(error));
    };

    signout = (callback: () => void) => {
        this.setState({
            isAuthenticated: false,
            token: undefined,
            user: undefined
        });
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        callback();
    };


    render() {
        const {isAuthenticated, user, token} = this.state;

        const MenuBar = withRouter(({history, location: {pathname}}) => {
            if (isAuthenticated && user) {
                return (
                    <Menu inverted stackable size={'massive'} style={{borderRadius: 0}}>
                        <Menu.Item header> WED3 Finances Incorporated</Menu.Item>
                        <Menu.Item
                            as={Link} to={"/"}
                            name='home'
                            active={pathname === '/'}
                        >
                            Kontoübersicht
                        </Menu.Item>

                        <Menu.Item
                            as={Link} to={"/transactions"}
                            name='transactions'
                            active={pathname === '/transactions'}
                        >
                            Zahlungen
                        </Menu.Item>
                        <Menu.Menu position='right'>
                            <Menu.Item name="logout">
                                <Button onClick={event => {
                                    event.preventDefault();
                                    this.signout(() => history.push("/"));
                                }}> Logout {user.firstname} {user.lastname}
                                </Button>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                );
            } else {
                return null;
            }
        });
        return (
            <Router>
                <div>
                    <MenuBar/>
                    <Route
                        exact
                        path="/"
                        render={() => {
                            if (!isAuthenticated) {
                                return (<Redirect
                                    to={{pathname: "/login"}}
                                />);
                            } else {
                                return (
                                    React.createElement(Dashboard, {user, token})
                                );
                            }
                        }}
                    />
                    <Route
                        path="/login"
                        render={props => (
                            <Login {...props} authenticate={this.authenticate}/>
                        )}
                    />
                    <Route
                        path="/signup"
                        render={props => (
                            <Signup {...props} authenticate={this.authenticate}/>
                        )}
                    />
                    {/*
            This is a comment inside JSX! It's a bit ugly, but works fine.

            The following are protected routes that are only available for logged-in users. We also pass the user and token so
            these components can do API calls. PrivateRoute is not part of react-router but our own implementation.
          */}

                    <PrivateRoute
                        path="/transactions"
                        isAuthenticated={isAuthenticated}
                        token={token}
                        user={user}
                        component={AllTransactions}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
