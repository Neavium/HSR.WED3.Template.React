//@flow
import React, {Component} from "react";
import {
    Button,
    Dimmer,
    Divider,
    Form,
    Grid,
    Header,
    Loader,
    Segment,
    Table,
    Container,
    Dropdown,
} from 'semantic-ui-react';
import {getTransactions} from "../api";
import TransactionList from "./TransactionList";

const yearOptions = [
    {key: '2017', value: '2017', text: '2017'},
    {key: '2018', value: '2018', text: '2018'},
    {key: '2019', value: '2019', text: '2019'}
];

const monthOptions = [
    {key: '1', value: 'January', text: 'January'},
    {key: '2', value: 'February', text: 'February'},
    {key: '3', value: 'March', text: 'March'},
    {key: '4', value: 'April', text: 'April'},
    {key: '5', value: 'May', text: 'May'},
    {key: '6', value: 'June', text: 'June'},
    {key: '7', value: 'Juli', text: 'Juli'},
    {key: '8', value: 'August', text: 'August'},
    {key: '9', value: 'September', text: 'September'},
    {key: '10', value: 'October', text: 'October'},
    {key: '11', value: 'November', text: 'November'},
    {key: '12', value: 'December', text: 'December'},
]

class AllTransactions extends Component {
    render() {
        return (
            <Container>
                <Segment.Group>
                    <Segment secondary size={'massive'}>
                        <Header>
                            All Transactions
                        </Header>
                    </Segment>
                    <Segment>
                        <Header>
                            Filter
                        </Header>
                        <Dropdown placeholder={'Select Year'} search selection options={yearOptions}/>
                        <Dropdown placeholder={'Select Month'} search selection options={monthOptions}/>
                        <Divider/>
                        <TransactionList token={this.props.token} fromDate={''} toDate={''} count={-1} skip={0} showDate={true}/>
                    </Segment>
                </Segment.Group>
            </Container>

        )
    }
}

export default AllTransactions;