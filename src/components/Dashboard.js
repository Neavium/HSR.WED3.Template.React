//@flow
import React, {Component} from "react";
import {Button, Dimmer, Divider, Form, Grid, Header, Loader, Segment, Table} from 'semantic-ui-react'

const Dashboard = () => (
    <FillDashboard/>
);

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
                            <LatestTransactions/>
                            <Button primary content={'All Transactions'}/>
                        </Segment>
                    </Segment.Group>
                </Grid.Column>
            </Grid>
        )
    }
}

class LatestTransactions extends Component {
    render() {
        return (
            <>
                <Divider/>
                <Table singleLine basic={'very'}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Source</Table.HeaderCell>
                            <Table.HeaderCell>Target</Table.HeaderCell>
                            <Table.HeaderCell>Amount [CHF]</Table.HeaderCell>
                            <Table.HeaderCell>Balance [CHF]</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Dimmer.Dimmable as={Table.Body}>
                        <Table.Row>
                            <Table.Cell> No Data </Table.Cell>
                            <Table.Cell> No Data </Table.Cell>
                            <Table.Cell> No Data </Table.Cell>
                            <Table.Cell> No Data </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell> No Data </Table.Cell>
                            <Table.Cell> No Data </Table.Cell>
                            <Table.Cell> No Data </Table.Cell>
                            <Table.Cell> No Data </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell> No Data </Table.Cell>
                            <Table.Cell> No Data </Table.Cell>
                            <Table.Cell> No Data </Table.Cell>
                            <Table.Cell> No Data </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell> No Data </Table.Cell>
                            <Table.Cell> No Data </Table.Cell>
                            <Table.Cell> No Data </Table.Cell>
                            <Table.Cell> No Data </Table.Cell>
                        </Table.Row>
                        <Dimmer active={true}>
                                <Loader content={'Loading Data...'}/>
                        </Dimmer>
                    </Dimmer.Dimmable>
                </Table>
            </>
        )
    }
}

export default Dashboard;
