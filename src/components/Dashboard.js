import React, {Component} from "react";
import {Button, Form, Grid, Segment} from 'semantic-ui-react'

const Dashboard = () => (
    <FormExampleClearOnSubmit/>
);

class FormExampleClearOnSubmit extends Component {
    state = {};

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    handleSubmit = () => this.setState({from: '', to: '', amount: ''});

    render() {
        const {transactionFrom, transactionTo, transactionAmount} = this.state;

        return (
            <Grid streched columns='equal' container stackable >
                <Grid.Column width={5}>
                    <Segment>
                        <Form onSubmit={this.handleSubmit}>

                            <Form.Input label='From:' placeholder='Transaction Sender' name='from' value={transactionFrom} onChange={this.handleChange}/>
                            <Form.Input label='To:' placeholder='Target Account Number' name='to' value={transactionTo} onChange={this.handleChange}/>
                            <Form.Input label='Amount [CHF]:' placeholder='Amount in CHF' name='amount' value={transactionAmount} onChange={this.handleChange}/>
                            <Form.Button content='Pay' as={Button} primary/>
                        </Form>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment>
                        <div> Hello</div>
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Dashboard;
