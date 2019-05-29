//@flow
import React, {Component} from "react";
import {Button, Dimmer, Divider, Form, Grid, Header, Loader, Segment, Table} from 'semantic-ui-react'
import {getTransactions} from "../api";

class Dashboard extends Component{
    render(){
        return (<FillDashboard token={this.props.token}/>)
    }
}

class FillDashboard extends Component {
    state = {};

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
                            <LatestTransactions token={this.props.token}/>
                            <Button primary content={'All Transactions'}/>
                        </Segment>
                    </Segment.Group>
                </Grid.Column>
            </Grid>
        )
    }
}

class LatestTransactions extends Component {

    state = {
        transactions: []
    };

    componentDidMount() {
        getTransactions(this.props.token)
            .then(returnedTransactions => this.setState({transactions: returnedTransactions.result}))
    }

    render = () => <TransactionList transactions={this.state.transactions}/>
}

function TransactionList({transactions}) {
    const renderTransaction = ({from, target, amount, total, date}) =>
        <Table.Row>
            <Table.Cell>{from}</Table.Cell>
            <Table.Cell>{target}</Table.Cell>
            <Table.Cell>{amount}</Table.Cell>
            <Table.Cell>{total}</Table.Cell>
        </Table.Row>;
    return <Table singleLine basic={'very'}>{transactions.map(renderTransaction)} </Table>
}


export default Dashboard;
