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
import TransactionList from "./TransactionList";

const yearOptions = [
    {key: '2017', value: '2017', text: '2017'},
    {key: '2018', value: '2018', text: '2018'},
    {key: '2019', value: '2019', text: '2019'}
];

const monthOptions = [
    {key: '1', value: '0', text: 'January'},
    {key: '2', value: '1', text: 'February'},
    {key: '3', value: '2', text: 'March'},
    {key: '4', value: '3', text: 'April'},
    {key: '5', value: '4', text: 'May'},
    {key: '6', value: '5', text: 'June'},
    {key: '7', value: '6', text: 'Juli'},
    {key: '8', value: '7', text: 'August'},
    {key: '9', value: '8', text: 'September'},
    {key: '10', value: '9', text: 'October'},
    {key: '11', value: '10', text: 'November'},
    {key: '12', value: '11', text: 'December'},
]

class AllTransactions extends Component {

    state = {
        fromDate: new Date('1900-01-01').toJSON(),
        toDate: new Date('2100-12-31').toJSON()
    };

    handleChange = (e, {name, value}) => {
        let from = new Date(this.state.fromDate);
        let to = new Date(this.state.toDate);

        if (name === 'year') {
            from.setFullYear(value);
            to.setFullYear(value);

        } else if (name === 'month') {
            let endMonth: number = value;
            from.setMonth(value);
            to.setMonth( ++endMonth);
            to.setDate(1);
            to.setDate(to.getDate() - 1);
        }

        this.setState({
            fromDate: from.toJSON(),
            toDate: to.toJSON()
        });
    };

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
                        <Dropdown
                            name={'year'}
                            placeholder={'Select Year'}
                            search
                            selection
                            options={yearOptions}
                            onChange={this.handleChange}
                        />
                        <Dropdown
                            name={'month'}
                            placeholder={'Select Month'}
                            search
                            selection
                            options={monthOptions}
                            onChange={this.handleChange}
                        />
                        <Divider/>
                        <TransactionList token={this.props.token} fromDate={this.state.fromDate}
                                         toDate={this.state.toDate} count={-1} skip={0}
                                         showDate={true}/>
                    </Segment>
                </Segment.Group>
            </Container>

        )
    }
}

export default AllTransactions;