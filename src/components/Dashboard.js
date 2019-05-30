//@flow
import React, {Component} from "react";
import {Button, Divider, Form, Grid, Header, Menu, Message, Segment} from 'semantic-ui-react';
import {TransactionList} from "./TransactionList";
import {Link} from "react-router-dom";
import {getAccountDetails, transfer, getAccount} from "../api";


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            amount: 0,
            targetAccount: 0,
            targetAccountName: '',
            amountError: false,
            targetAccountError: false,
        };
    }

    //Todo: Neue Transaktion Funktionalität implementieren
    handleChange = (e, {name, value}) => {
        switch (name) {
            case('amount'):
                this.setState({amountError: (value <= 0.5 || isNaN(value)) && value !== ""});
                break;
            case ('targetAccount'):
                this.isValidTargetAccount(value);
                break;
        }
        this.setState({[name]: value});
    };

    handleSubmit = () => transfer(this.state.targetAccount, this.state.amount, this.props.token);

    isValidTargetAccount = (account) => {
        if (account === '') {
            this.setState({targetAccountError: true})
            return;
        }

        getAccount(account, this.props.token)
            .catch(err => {
                this.setState({targetAccountName: '', targetAccountError: true});
                console.log('error: ' + err);
            })
            .then(result => {
                console.log(result);
                this.setState({targetAccountName: result.owner.firstname + ' ' + result.owner.lastname
                , targetAccountError: false});
            });
    };

    componentDidMount() {
        getAccountDetails(this.props.token)
            .then(ownerInfo => this.setState({balance: ownerInfo.amount}));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState === this.state && prevProps === this.props) {
            return;
        }

        getAccountDetails(this.props.token)
            .then(ownerInfo => this.setState({balance: ownerInfo.amount}));

    }


    render() {
        const {transactionFrom, transactionTo, transactionAmount} = this.state;

        return (
            <Grid streched columns='equal' container stackable>
                <Grid.Column width={5}>
                    <Segment.Group>
                        <Segment secondary size={'massive'}>
                            <Header>
                                New Payment
                            </Header>
                        </Segment>
                        <Segment>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Input disabled
                                            label='From:'
                                            name='from'
                                            value={this.props.user.accountNr + ' [' + this.state.balance + ' CHF]'}
                                            onChange={this.handleChange}>
                                </Form.Input>
                                <Form.Input label='To:'
                                            placeholder='Target Account Number'
                                            name='targetAccount'
                                            value={transactionTo}
                                            onChange={this.handleChange}
                                >
                                </Form.Input>
                                {!this.state.targetAccount && <p>Please specify the target account number.</p>}
                                {this.state.targetAccountError && this.state.targetAccount ? <p>Unkown account number specified.</p> :
                                    <p>{this.state.targetAccountName}</p>}
                                <Form.Input label='Amount [CHF]:'
                                            placeholder='Amount in CHF'
                                            name='amount'
                                            value={transactionAmount}
                                            onChange={this.handleChange}
                                />
                                {!this.state.amount && <p>Please specify the amount.</p>}
                                {this.state.amountError && <p>Please input a valid amount.</p>}
                                <Form.Button
                                    content='Pay'
                                    as={Button}
                                    primary
                                    disabled={!this.state.targetAccount
                                    || !this.state.amount
                                    || this.state.targetAccountError
                                    || this.state.amountError}
                                />
                            </Form>
                        </Segment>
                    </Segment.Group>
                </Grid.Column>
                <Grid.Column>
                    <Segment.Group>
                        <Segment secondary size={'massive'}>
                            <Header>
                                Latest Transactions
                            </Header>
                        </Segment>
                        <Segment>
                            <Divider/>
                            <TransactionList token={this.props.token} fromDate={''} toDate={''} count={3} skip={0}
                                             showDate={false}/>
                            <Button
                                primary content={'All Transactions'}
                                as={Link}
                                to={"/transactions"}
                                name='transactions'
                            />
                        </Segment>
                    </Segment.Group>
                </Grid.Column>
            </Grid>
        )
    }
}


export default Dashboard;
