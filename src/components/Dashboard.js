//@flow
import React, {Component} from "react";
import {Button, Dimmer, Divider, Form, Grid, Header, Loader, Segment, Table} from 'semantic-ui-react';
import {getTransactions} from "../api";
import {TransactionList} from "./TransactionList";


class Dashboard extends Component {
    state = {};

    //Todo: Neue Transaktion Funktionalität implementieren
    handleChange = (e, {name, value}) => this.setState({[name]: value});

    handleSubmit = () => this.setState({from: '', to: '', amount: ''});

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
                                <Form.Input label='From:' placeholder='Transaction Sender' name='from'
                                            value={transactionFrom} onChange={this.handleChange}/>
                                <Form.Input label='To:' placeholder='Target Account Number' name='to'
                                            value={transactionTo} onChange={this.handleChange}/>
                                <Form.Input label='Amount [CHF]:' placeholder='Amount in CHF' name='amount'
                                            value={transactionAmount} onChange={this.handleChange}/>
                                <Form.Button content='Pay' as={Button} primary/>
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
                            <TransactionList token={this.props.token} fromDate={''} toDate={''} count={3} skip={0} showDate={false}/>
                            <Button primary content={'All Transactions'}/>
                        </Segment>
                    </Segment.Group>
                </Grid.Column>
            </Grid>
        )
    }
}


export default Dashboard;
