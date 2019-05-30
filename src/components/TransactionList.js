//@flow
import React, {Component} from "react";
import {Table} from 'semantic-ui-react';
import {getTransactions} from "../api";

export class TransactionList extends Component {
    i: Number;

    constructor(props) {
        super(props);
        this.state = {
            transactions: []
        };
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.toDate !== nextProps.toDate){
            return true;
        }
        if(this.props.fromDate !== nextProps.fromDate){
            return true;
        }
        if(this.state.transactions !== nextState.transactions){
            return true;
        }
        return false;
    }

    componentDidMount() {
        console.log('getting transactions!');
        getTransactions(this.props.token, this.props.fromDate, this.props.toDate, this.props.count, this.props.skip)
            .then(returnedTransactions => this.setState({transactions: returnedTransactions.result}))
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps !== this.props){
            getTransactions(this.props.token, this.props.fromDate, this.props.toDate, this.props.count, this.props.skip)
                .then(returnedTransactions => this.setState({transactions: returnedTransactions.result}))
        }

    }

    render = () => <TransactionsToList transactions={this.state.transactions} showDate={this.props.showDate}/>
}

function TransactionsToList({transactions, showDate}) {
    const renderTransaction = ({from, target, amount, total, date}) =>
        <Table.Row>
            {showDate && <Table.Cell>{convertJSONDate(date).toLocaleDateString()}</Table.Cell>}
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

function convertJSONDate(dateStr){
    return new Date(dateStr);
}



export default TransactionList;