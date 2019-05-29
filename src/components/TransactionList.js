//@flow
import React, {Component} from "react";
import {Button, Dimmer, Divider, Form, Grid, Header, Loader, Segment, Table} from 'semantic-ui-react';
import {getTransactions} from "../api";

export class TransactionList extends Component {

    state = {
        transactions: []
    };

    componentDidMount() {
        getTransactions(this.props.token, this.props.fromDate, this.props.toDate, this.props.count, this.props.skip)
            .then(returnedTransactions => this.setState({transactions: returnedTransactions.result}))
    }

    render = () => <TransactionsToList transactions={this.state.transactions} showDate={this.props.showDate}/>
}

function TransactionsToList({transactions, showDate}) {
    const renderTransaction = ({from, target, amount, total, date}) =>
        <Table.Row>
            {showDate && <Table.Cell>{date}</Table.Cell>}
            <Table.Cell>{from}</Table.Cell>
            <Table.Cell>{target}</Table.Cell>
            <Table.Cell>{amount}</Table.Cell>
            <Table.Cell>{total}</Table.Cell>
        </Table.Row>;
    return (
        <Table singleLine basic={'very'}>
            <Table.Header>
                <Table.Row>
                    {showDate && <Table.HeaderCell>Date</Table.HeaderCell>}
                    <Table.HeaderCell>Source</Table.HeaderCell>
                    <Table.HeaderCell>Target</Table.HeaderCell>
                    <Table.HeaderCell>Amount [CHF]</Table.HeaderCell>
                    <Table.HeaderCell>Balance [CHF]</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {transactions.map(renderTransaction)}
            </Table.Body>
        </Table>
    )
}

export default TransactionList;