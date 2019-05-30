//@flow
import React, {Component} from "react";
import {Dimmer, Loader, Table} from 'semantic-ui-react';
import {getTransactions} from "../api";

export class TransactionList extends Component {
    i: Number;

    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            loading: true,
        };
    }

    componentDidMount() {
        console.log('getting transactions!');
        getTransactions(this.props.token, this.props.fromDate, this.props.toDate, this.props.count, this.props.skip)
            .then(returnedTransactions => this.setState({transactions: returnedTransactions.result, loading: false}))
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.loading) {
            return;
        }
        if (prevProps !== this.props) {
            this.setState({loading: true});
            getTransactions(this.props.token, this.props.fromDate, this.props.toDate, this.props.count, this.props.skip)
                .then(returnedTransactions => this.setState({
                    transactions: returnedTransactions.result,
                    loading: false
                }))
        }


    }

    render() {
        return (
            <Table unstackable basic={'very'}>
                <Dimmer inverted active={this.state.loading}><Loader/></Dimmer>
                <TransactionsToList transactions={this.state.transactions} showDate={this.props.showDate}/>
            </Table>
        )
    }
}

function TransactionsToList({transactions, showDate}) {
    const renderTransaction = ({from, target, amount, total, date}) => {
        return (
            <Table.Row>
                {showDate && <Table.Cell>{convertJSONDate(date).toLocaleDateString()}</Table.Cell>}
                <Table.Cell>{from}</Table.Cell>
                <Table.Cell>{target}</Table.Cell>
                <Table.Cell>{amount}</Table.Cell>
                <Table.Cell>{total}</Table.Cell>
            </Table.Row>
        )
    };

    return (
        <>
            <Table.Header>
                <Table.Row>
                    {showDate && <Table.HeaderCell>Date</Table.HeaderCell>}
                    <Table.HeaderCell>Source</Table.HeaderCell>
                    <Table.HeaderCell>Target</Table.HeaderCell>
                    <Table.HeaderCell>Amount [CHF]</Table.HeaderCell>
                    <Table.HeaderCell>Balance [CHF]</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            < Table.Body>
                {transactions.map(renderTransaction)}
            </Table.Body>
        </>
    )
}

function convertJSONDate(dateStr) {
    return new Date(dateStr);
}


export default TransactionList;